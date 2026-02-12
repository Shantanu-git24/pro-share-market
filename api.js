import { Platform } from 'react-native';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DEFAULT_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL;

const requestJson = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
};

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

  getIndices: async () => {
    try {
      const payload = await requestJson('/api/indices');
      return payload.data || [];
    } catch (error) {
      await delay(200);
      return [];
    }
  },

  getStocks: async (symbols = []) => {
    try {
      const query = symbols.length ? `?symbols=${symbols.join(',')}` : '';
      const payload = await requestJson(`/api/stocks${query}`);
      const base = [175.22, 189.42, 875.28, 64231.2, 312.8, 421.4];
      return (payload.data || []).map((stock, index) => ({
        ...stock,
        sparkline: createSparkline(base[index] || stock.price || 100)
      }));
    } catch (error) {
      await delay(200);
      return [];
    }
  },

  getHeatmap: async () => {
    try {
      const payload = await requestJson('/api/heatmap');
      return payload.data || [];
    } catch (error) {
      await delay(200);
      return [];
    }
  },

  getMutualFunds: async () => {
    try {
      const payload = await requestJson('/api/mutual-funds');
      return payload.data || [];
    } catch (error) {
      await delay(200);
      return [];
    }
  },

  getCommodities: async () => {
    try {
      const payload = await requestJson('/api/commodities');
      return payload.data || [];
    } catch (error) {
      await delay(200);
      return [];
    }
  },

  getNews: async () => {
    try {
      const payload = await requestJson('/api/news');
      return payload.data || [];
    } catch (error) {
      await delay(200);
      return [];
    }
  }
};
