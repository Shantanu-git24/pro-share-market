const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const createSparkline = (base) => {
  const points = 12;
  const data = [];
  let value = base;
  for (let i = 0; i < points; i += 1) {
    const delta = (Math.random() - 0.45) * 4;
    value = Math.max(1, value + delta);
    data.push(Number(value.toFixed(2)));
  }
  return data;
};

export const api = {
  login: async (email, password) => {
    await delay(800);
    return { success: true, user: { name: "Alex Stratos", id: "8829", email } };
  },

  getStocks: async () => {
    await delay(400);
    const base = [175.22, 189.42, 875.28, 64231.2, 312.8, 421.4];
    return [
      { symbol: "TSLA", name: "Tesla Motors", price: 175.22, changePercent: 2.41 },
      { symbol: "AAPL", name: "Apple Inc.", price: 189.42, changePercent: -1.24 },
      { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28, changePercent: 4.12 },
      { symbol: "BTC", name: "Bitcoin", price: 64231.2, changePercent: 1.89 },
      { symbol: "MSFT", name: "Microsoft", price: 412.33, changePercent: 0.85 },
      { symbol: "META", name: "Meta Platforms", price: 312.8, changePercent: -0.62 }
    ].map((stock, index) => ({
      ...stock,
      sparkline: createSparkline(base[index] || stock.price)
    }));
  },

  getPortfolio: async () => {
    await delay(500);
    return {
      balance: 248192.45,
      profitLoss: 1240.5,
      profitLossPercent: 4.2
    };
  },

  getNews: async () => {
    await delay(500);
    return [
      {
        id: 1,
        title: "Fed signals potential rate cut as inflation cools",
        source: "Bloomberg",
        time: "12m ago",
        sentiment: "bullish",
        category: "Macro",
        imageUrl: "https://picsum.photos/seed/market/700/400"
      },
      {
        id: 2,
        title: "AI chip demand lifts mega-cap tech earnings",
        source: "Reuters",
        time: "45m ago",
        sentiment: "bullish",
        category: "Tech",
        imageUrl: "https://picsum.photos/seed/ai/700/400"
      },
      {
        id: 3,
        title: "Crypto volatility spikes as regulation chatter grows",
        source: "CoinDesk",
        time: "2h ago",
        sentiment: "bearish",
        category: "Crypto",
        imageUrl: "https://picsum.photos/seed/crypto/700/400"
      }
    ];
  },

  executeTrade: async () => {
    await delay(900);
    return {
      success: true,
      transactionId: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    };
  }
};
