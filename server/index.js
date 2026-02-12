const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 4000);
const INDIAN_API_KEY = process.env.INDIAN_API_KEY || '';
const INDIAN_API_BASE_URL = 'https://stock.indianapi.in';

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

const indianApiFetchJson = async (path) => {
  if (!INDIAN_API_KEY) {
    throw new Error('Missing IndianAPI key');
  }
  const response = await fetch(`${INDIAN_API_BASE_URL}${path}`, {
    headers: {
      'Accept': 'application/json',
      'X-API-Key': INDIAN_API_KEY
    }
  });
  if (!response.ok) {
    throw new Error(`IndianAPI request failed: ${response.status}`);
  }
  const payload = await safeJson(response);
  if (!payload) {
    throw new Error('Invalid IndianAPI JSON payload');
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

const toNumber = (value) => {
  if (value === null || value === undefined) {
    return 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  const normalized = String(value).replace(/,/g, '').trim();
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
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

const parseTimeValue = (value) => {
  if (!value) {
    return now();
  }
  const normalized = String(value).replace('T', ' ').replace('Z', '');
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
    title: 'Live news feed will appear once the IndianAPI key is configured.',
    source: 'Market Center',
    time: 'Now',
    sentiment: 'bullish',
    category: 'Setup',
    imageUrl: 'https://picsum.photos/seed/market/700/400'
  }
];

const fallbackCommodities = [
  {
    symbol: 'GOLD',
    name: 'Gold',
    price: 0,
    change: 0,
    changePercent: 0,
    unit: 'Per 10 Grams',
    source: 'fallback'
  },
  {
    symbol: 'SILVER',
    name: 'Silver',
    price: 0,
    change: 0,
    changePercent: 0,
    unit: 'Per 1 Kilogram',
    source: 'fallback'
  }
];

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: now() });
});

app.get('/api/debug/indianapi', async (_req, res) => {
  try {
    const [stockPayload, heatmapPayload, newsPayload] = await Promise.all([
      indianApiFetchJson('/stock?name=Reliance'),
      indianApiFetchJson('/NSE_most_active'),
      indianApiFetchJson('/news')
    ]);

    const heatmapList = Array.isArray(heatmapPayload) ? heatmapPayload : heatmapPayload?.data || [];
    const newsList = Array.isArray(newsPayload) ? newsPayload : newsPayload?.data || newsPayload?.news || [];

    res.json({
      ok: true,
      stock: {
        tickerId: stockPayload?.tickerId || null,
        companyName: stockPayload?.companyName || null,
        price: stockPayload?.currentPrice?.NSE || stockPayload?.currentPrice?.BSE || stockPayload?.currentPrice || null
      },
      heatmap: {
        count: heatmapList.length,
        sample: heatmapList[0] || null
      },
      news: {
        count: newsList.length,
        sample: newsList[0] || null
      }
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/api/debug/stock', async (req, res) => {
  try {
    const name = String(req.query.name || 'RELIANCE');
    const payload = await indianApiFetchJson(`/stock?name=${encodeURIComponent(name)}`);
    res.json({ ok: true, name, payload });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/api/debug/indices', async (_req, res) => {
  try {
    const payload = await nseFetchJson('/api/allIndices');
    const list = payload?.data || [];
    const bySymbol = new Map(list.map((item) => [item.indexSymbol, item]));

    const summarize = (symbol) => {
      const entry = bySymbol.get(symbol);
      return entry
        ? {
          symbol,
          last: entry.last,
          variation: entry.variation,
          percentChange: entry.percentChange
        }
        : null;
    };

    res.json({
      ok: true,
      nifty: summarize('NIFTY 50'),
      bankNifty: summarize('NIFTY BANK'),
      sensex: summarize('SENSEX')
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
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
        const payload = await indianApiFetchJson(`/stock?name=${encodeURIComponent(item.symbol)}`);
        const price = toNumber(payload?.currentPrice?.NSE || payload?.currentPrice?.BSE || payload?.currentPrice || payload?.price);
        const changePercent = toNumber(payload?.percentChange || payload?.percent_change);
        const change = price && changePercent ? (price * changePercent) / 100 : toNumber(payload?.netChange || payload?.net_change || payload?.change);
        quotes.push({
          symbol: payload?.tickerId || item.symbol,
          name: payload?.companyName || item.name,
          price,
          change,
          changePercent,
          open: toNumber(payload?.stockTechnicalData?.open || payload?.open),
          high: toNumber(payload?.stockTechnicalData?.dayHigh || payload?.high),
          low: toNumber(payload?.stockTechnicalData?.dayLow || payload?.low),
          volume: toNumber(payload?.stockTechnicalData?.volume || payload?.volume),
          source: 'indianapi'
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
      const payload = await indianApiFetchJson('/NSE_most_active');
      const list = Array.isArray(payload) ? payload : payload?.data || [];
      return list.slice(0, 8).map((item) => ({
        symbol: String(item.ticker || item.symbol || '').replace('.NS', ''),
        name: item.company || item.company_name || item.name,
        changePercent: toNumber(item.percent_change || item.percentChange),
        change: toNumber(item.net_change || item.netChange),
        price: toNumber(item.price),
        source: 'indianapi'
      }));
    });
    res.json({ data });
  } catch (error) {
    res.json({ data: fallbackStocks, error: error.message });
  }
});

app.get('/api/commodities', async (_req, res) => {
  try {
    const data = await getCached('commodities', 5 * 60 * 1000, async () => {
      const payload = await indianApiFetchJson('/commodities');
      const list = Array.isArray(payload) ? payload : payload?.data || [];
      return list.map((item) => {
        const contractSize = toNumber(item.contractSize || item.contract_size);
        const unit = item.priceUnit || item.price_unit;
        return {
          symbol: item.commoditySymbol || item.commodity_symbol || item.symbol || item.contractId,
          name: item.commoditySymbol || item.commodity_symbol || item.symbol || 'Commodity',
          price: toNumber(item.lastTradedPrice || item.last_traded_price || item.price),
          change: toNumber(item.priceChange || item.price_change || item.change),
          changePercent: toNumber(item.percentageChange || item.percentage_change || item.changePercent),
          unit: contractSize && unit ? `Per ${contractSize} ${unit}` : unit || 'Per Contract',
          source: 'indianapi'
        };
      });
    });
    res.json({ data });
  } catch (error) {
    res.json({ data: fallbackCommodities, error: error.message });
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
      const payload = await indianApiFetchJson('/news');
      const list = Array.isArray(payload) ? payload : payload?.data || payload?.news || [];
      if (!list.length) {
        return fallbackNews;
      }
      return list.slice(0, 8).map((item, index) => {
        const title = item.title || item.headline || item.news_title || 'Market update';
        const source = item.source || item.publisher || item.source_name || 'Market News';
        const published = item.published_at || item.published || item.date || item.time;
        const publishedAt = parseTimeValue(published);
        const sentimentLabel = String(item.sentiment || item.overall_sentiment || '').toLowerCase();
        return {
          id: item.id || item.news_id || `indian-${index}`,
          title,
          source,
          time: timeAgo(publishedAt),
          sentiment: sentimentLabel.includes('bear') ? 'bearish' : 'bullish',
          category: item.category || item.topic || item.tags?.[0] || 'Market',
          imageUrl: item.image || item.imageUrl || item.banner_image || 'https://picsum.photos/seed/market/700/400'
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
