const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 4000);
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || '';

const NSE_BASE_URL = 'https://www.nseindia.com';
const NSE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive',
  'Referer': 'https://www.nseindia.com/'
};

const NSE_COOKIE_TTL = 10 * 60 * 1000;
let nseCookie = '';
let nseCookieTimestamp = 0;

const cache = new Map();

const now = () => Date.now();

const getCached = async (key, ttlMs, fetcher) => {
  const cached = cache.get(key);
  if (cached && now() - cached.timestamp < ttlMs) {
    return cached.value;
  }
  const value = await fetcher();
  cache.set(key, { value, timestamp: now() });
  return value;
};

const safeJson = async (response) => {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const payload = await safeJson(response);
  if (!payload) {
    throw new Error('Invalid JSON payload');
  }
  return payload;
};

const refreshNseCookie = async () => {
  const response = await fetch(NSE_BASE_URL, { headers: NSE_HEADERS });
  const setCookie = response.headers.get('set-cookie');
  if (setCookie) {
    nseCookie = setCookie
      .split(',')
      .map((part) => part.split(';')[0])
      .join('; ');
    nseCookieTimestamp = now();
  }
};

const nseFetchJson = async (path) => {
  if (!nseCookie || now() - nseCookieTimestamp > NSE_COOKIE_TTL) {
    await refreshNseCookie();
  }

  const headers = { ...NSE_HEADERS };
  if (nseCookie) {
    headers.Cookie = nseCookie;
  }

  let response = await fetch(`${NSE_BASE_URL}${path}`, { headers });
  if (response.status === 401 || response.status === 403) {
    await refreshNseCookie();
    const retryHeaders = { ...NSE_HEADERS, Cookie: nseCookie };
    response = await fetch(`${NSE_BASE_URL}${path}`, { headers: retryHeaders });
  }

  if (!response.ok) {
    throw new Error(`NSE request failed: ${response.status}`);
  }

  const payload = await safeJson(response);
  if (!payload) {
    throw new Error('Invalid NSE JSON payload');
  }
  return payload;
};

const alphaQuote = async (symbol) => {
  if (!ALPHA_VANTAGE_API_KEY) {
    throw new Error('Missing Alpha Vantage API key');
  }
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${ALPHA_VANTAGE_API_KEY}`;
  const payload = await fetchJson(url);
  const quote = payload['Global Quote'];
  if (!quote || !quote['05. price']) {
    throw new Error(`No data for ${symbol}`);
  }
  return {
    symbol: quote['01. symbol'],
    price: Number(quote['05. price']),
    change: Number(quote['09. change']),
    changePercent: Number(String(quote['10. change percent']).replace('%', '')),
    open: Number(quote['02. open']),
    high: Number(quote['03. high']),
    low: Number(quote['04. low']),
    volume: Number(quote['06. volume'])
  };
};

const timeAgo = (timestamp) => {
  const seconds = Math.max(1, Math.floor((now() - timestamp) / 1000));
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const parseAlphaTime = (value) => {
  if (!value) {
    return now();
  }
  const normalized = value.replace('T', ' ').replace('Z', '');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return now();
  }
  return date.getTime();
};

const INDEX_SYMBOLS = [
  { label: 'NIFTY 50', nseSymbol: 'NIFTY 50' },
  { label: 'SENSEX', nseSymbol: null },
  { label: 'BANK NIFTY', nseSymbol: 'NIFTY BANK' }
];

const STOCK_SYMBOLS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'LT', name: 'Larsen & Toubro' },
  { symbol: 'ITC', name: 'ITC Limited' }
];

const MUTUAL_FUNDS = [
  { code: '120465', name: 'SBI Bluechip Fund' },
  { code: '120503', name: 'Axis Small Cap Fund' },
  { code: '118834', name: 'ICICI Pru Bluechip Fund' },
  { code: '118989', name: 'Mirae Asset Large Cap Fund' }
];

const fallbackIndices = INDEX_SYMBOLS.map((item) => ({
  label: item.label,
  symbol: item.nseSymbol || item.label,
  price: 0,
  change: 0,
  changePercent: 0,
  up: true,
  source: 'fallback'
}));

const fallbackStocks = STOCK_SYMBOLS.map((item) => ({
  symbol: item.symbol,
  name: item.name,
  price: 0,
  change: 0,
  changePercent: 0,
  source: 'fallback'
}));

const fallbackNews = [
  {
    id: 'fallback-1',
    title: 'Live news feed will appear once API key is configured.',
    source: 'Market Center',
    time: 'Now',
    sentiment: 'bullish',
    category: 'Setup',
    imageUrl: 'https://picsum.photos/seed/market/700/400'
  }
];

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: now() });
});

app.get('/api/indices', async (_req, res) => {
  try {
    const data = await getCached('indices', 60 * 1000, async () => {
      const payload = await nseFetchJson('/api/allIndices');
      const list = payload?.data || [];
      const bySymbol = new Map(list.map((item) => [item.indexSymbol, item]));

      return INDEX_SYMBOLS.map((item) => {
        if (!item.nseSymbol) {
          return {
            label: item.label,
            symbol: item.label,
            price: 0,
            change: 0,
            changePercent: 0,
            up: true,
            source: 'fallback'
          };
        }

        const index = bySymbol.get(item.nseSymbol);
        if (!index) {
          return {
            label: item.label,
            symbol: item.nseSymbol,
            price: 0,
            change: 0,
            changePercent: 0,
            up: true,
            source: 'fallback'
          };
        }

        const change = Number(index.variation || 0);
        const changePercent = Number(index.percentChange || 0);
        return {
          label: item.label,
          symbol: item.nseSymbol,
          price: Number(index.last || 0),
          change,
          changePercent,
          up: change >= 0,
          source: 'nse'
        };
      });
    });
    res.json({ data });
  } catch (error) {
    res.json({ data: fallbackIndices, error: error.message });
  }
});

app.get('/api/stocks', async (req, res) => {
  const requested = String(req.query.symbols || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((symbol) => symbol.split('.')[0]);
  const symbols = requested.length
    ? requested.map((symbol) => ({ symbol, name: symbol }))
    : STOCK_SYMBOLS;

  try {
    const data = await getCached(`stocks:${symbols.map((item) => item.symbol).join(',')}`, 60 * 1000, async () => {
      const quotes = [];
      for (const item of symbols) {
        const payload = await nseFetchJson(`/api/quote-equity?symbol=${encodeURIComponent(item.symbol)}`);
        const priceInfo = payload?.priceInfo || {};
        const info = payload?.info || {};
        const change = Number(priceInfo.change || 0);
        const changePercent = Number(priceInfo.pChange || 0);
        quotes.push({
          symbol: item.symbol,
          name: info.companyName || item.name,
          price: Number(priceInfo.lastPrice || 0),
          change,
          changePercent,
          open: Number(priceInfo.open || 0),
          high: Number(priceInfo.intraDayHighLow?.max || priceInfo.dayHigh || 0),
          low: Number(priceInfo.intraDayHighLow?.min || priceInfo.dayLow || 0),
          volume: Number(priceInfo.totalTradedVolume || 0),
          source: 'nse'
        });
      }
      return quotes;
    });
    res.json({ data });
  } catch (error) {
    res.json({ data: fallbackStocks, error: error.message });
  }
});

app.get('/api/heatmap', async (_req, res) => {
  try {
    const data = await getCached('heatmap', 60 * 1000, async () => {
      const quotes = [];
      for (const item of STOCK_SYMBOLS) {
        const payload = await nseFetchJson(`/api/quote-equity?symbol=${encodeURIComponent(item.symbol)}`);
        const priceInfo = payload?.priceInfo || {};
        quotes.push({
          symbol: item.symbol,
          name: item.name,
          changePercent: Number(priceInfo.pChange || 0),
          change: Number(priceInfo.change || 0),
          price: Number(priceInfo.lastPrice || 0),
          source: 'nse'
        });
      }
      return quotes;
    });
    res.json({ data });
  } catch (error) {
    res.json({ data: fallbackStocks, error: error.message });
  }
});

app.get('/api/mutual-funds', async (_req, res) => {
  try {
    const data = await getCached('mutual-funds', 30 * 60 * 1000, async () => {
      const results = [];
      for (const fund of MUTUAL_FUNDS) {
        const payload = await fetchJson(`https://api.mfapi.in/mf/${fund.code}`);
        const history = payload?.data || [];
        if (!history.length) {
          results.push({
            code: fund.code,
            name: fund.name,
            nav: 0,
            changePercent: 0,
            period: '1Y Return',
            source: 'mfapi'
          });
          continue;
        }
        const latest = history[0];
        const prev = history[1] || latest;
        const latestNav = Number(latest.nav);
        const prevNav = Number(prev.nav);
        const changePercent = prevNav ? ((latestNav - prevNav) / prevNav) * 100 : 0;

        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365);
        const oneYearEntry = history.find((entry) => new Date(entry.date) <= oneYearAgo) || history[history.length - 1];
        const oneYearNav = Number(oneYearEntry?.nav || latestNav);
        const oneYearReturn = oneYearNav ? ((latestNav - oneYearNav) / oneYearNav) * 100 : 0;

        results.push({
          code: fund.code,
          name: payload?.meta?.scheme_name || fund.name,
          nav: latestNav,
          changePercent,
          period: '1Y Return',
          returnPercent: oneYearReturn,
          source: 'mfapi'
        });
      }
      return results;
    });
    res.json({ data });
  } catch (error) {
    res.json({ data: MUTUAL_FUNDS.map((fund) => ({
      code: fund.code,
      name: fund.name,
      nav: 0,
      changePercent: 0,
      period: '1Y Return',
      source: 'fallback'
    })), error: error.message });
  }
});

app.get('/api/news', async (_req, res) => {
  try {
    const data = await getCached('news', 5 * 60 * 1000, async () => {
      if (!ALPHA_VANTAGE_API_KEY) {
        return fallbackNews;
      }
      const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=RELIANCE.BSE,TCS.BSE,HDFCBANK.BSE&apikey=${ALPHA_VANTAGE_API_KEY}`;
      const payload = await fetchJson(url);
      const feed = payload?.feed || [];
      return feed.slice(0, 8).map((item, index) => {
        const publishedAt = parseAlphaTime(item.time_published);
        return {
          id: item.id || `alpha-${index}`,
          title: item.title,
          source: item.source,
          time: timeAgo(publishedAt),
          sentiment: item.overall_sentiment_label?.toLowerCase().includes('bear') ? 'bearish' : 'bullish',
          category: item.topics?.[0]?.topic || 'Market',
          imageUrl: item.banner_image || 'https://picsum.photos/seed/market/700/400'
        };
      });
    });
    res.json({ data });
  } catch (error) {
    res.json({ data: fallbackNews, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
