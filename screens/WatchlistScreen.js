import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, RefreshControl } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { api } from '../api';
import { useFocusEffect } from '@react-navigation/native';

const COLORS = {
  primary: '#0ea5e9',
  background: '#f8fafc',
  success: '#16a34a',
  danger: '#ef4444',
  muted: '#64748b',
  text: '#0f172a',
  border: '#e2e8f0',
  soft: '#f1f5f9'
};

const buildSparkPath = (values) => {
  if (!values || !values.length) {
    return 'M0,20 L20,18 L40,22 L60,14 L80,18 L100,12';
  }
  if (values.length === 1) {
    return 'M0,15 L100,15';
  }
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 30 - ((value - min) / range) * 28;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(0)},${y.toFixed(0)}`;
    })
    .join(' ');
};

const sparkFromChange = (changePercent) => {
  const base = 20;
  const tilt = Math.max(-6, Math.min(6, Number(changePercent) || 0));
  const points = [base + tilt * 0.2, base + tilt * 0.4, base + tilt * 0.6, base + tilt * 0.8, base + tilt];
  return buildSparkPath(points);
};

const formatPrice = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '--';
  }
  return Number(value).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const timeAgo = (timestamp) => {
  if (!timestamp) {
    return 'Just now';
  }
  const seconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
  const minutes = Math.floor(seconds / 60);
  if (minutes < 1) {
    return 'Just now';
  }
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

export default function WatchlistScreen() {
  const navigation = useNavigation();
  const [watchlist, setWatchlist] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  const loadData = React.useCallback(async () => {
    const heatmapData = await api.getHeatmap();
    if (!heatmapData.length) {
      setWatchlist([]);
      setLastUpdatedAt(Date.now());
      return;
    }

    const updated = heatmapData.slice(0, 6).map((stock, index) => {
      const change = Number(stock.changePercent || 0);
      return {
        symbol: String(stock.symbol || '').replace('.NS', '').replace('.BSE', ''),
        name: stock.name || stock.symbol,
        price: `₹${formatPrice(stock.price)}`,
        change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        tone: change >= 0 ? COLORS.success : COLORS.danger,
        spark: sparkFromChange(change),
        highlight: index === 0
      };
    });
    setWatchlist(updated);
    setLastUpdatedAt(Date.now());
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [loadData]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [loadData])
  );
  return (
    <Screen style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Watchlist</Text>
            <Text style={styles.headerSubtitle}>Updated {timeAgo(lastUpdatedAt)}</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconButton}>
              <MaterialIcons name="search" size={18} color={COLORS.muted} />
            </Pressable>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtdrdI-tugWmAl2r4-cUQLbWn5lSVfrS9WJegLPmCbecqVESnyF7X2n1vapUbF6HbEQMADfd6aePFv-trjIchzVtWELRsI9_AG0tDWW3Z5xVqnZeaRL-t3wbYMUILNvMBBoenCKFgBBCer9Db0bflwgAUGXzA-dz5Psx7bI4HIHr4DoodgsYFqw8LFwN667xklInycvxLVE6RGpUlcsxmUX78D0AV8ifgpbCfW-eTmBmtL6tZlLY1s7Nf4ntWrS8v15kGYdZmMyFE' }}
              style={styles.avatar}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
          {['Tech Giants', 'Green Energy', 'Crypto Focus', 'Dividends'].map((label, index) => (
            <View key={label} style={[styles.tabChip, index === 0 && styles.tabChipActive]}>
              <Text style={[styles.tabText, index === 0 && styles.tabTextActive]}>{label}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {watchlist.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No live data yet</Text>
              <Text style={styles.emptyBody}>Pull to refresh once the market feed is available.</Text>
            </View>
          ) : watchlist.map((item) => (
            <Pressable
              key={item.symbol}
              style={[styles.card, item.highlight && styles.cardHighlight]}
              onPress={() => navigation.navigate('StockDetail', { symbol: item.symbol })}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardSymbol}>{item.symbol}</Text>
                  <Text style={styles.cardName}>{item.name}</Text>
                </View>
                <MaterialIcons name="drag-indicator" size={16} color={item.highlight ? COLORS.primary : COLORS.muted} />
              </View>
              <Svg width="100%" height="64" viewBox="0 0 100 40" style={styles.sparkline}>
                <Path d={item.spark} stroke={item.tone} strokeWidth="3" fill="none" strokeLinecap="round" />
                {item.highlight ? <Circle cx="100" cy="2" r="2" fill={item.tone} /> : null}
              </Svg>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <View style={[styles.changeBadge, { backgroundColor: `${item.tone}22` }]}>
                  <Text style={[styles.changeText, { color: item.tone }]}>{item.change}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.addButton}>
          <MaterialIcons name="add-circle-outline" size={22} color={COLORS.muted} />
          <Text style={styles.addText}>Add Asset to Watchlist</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 140
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontFamily: 'Manrope_700Bold'
  },
  headerSubtitle: {
    color: COLORS.muted,
    fontSize: 11
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.3)'
  },
  tabRow: {
    paddingVertical: 16,
    gap: 10
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  tabChipActive: {
    backgroundColor: COLORS.primary
  },
  tabText: {
    color: COLORS.muted,
    fontSize: 12,
    fontFamily: 'Manrope_600SemiBold'
  },
  tabTextActive: {
    color: '#ffffff'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  emptyState: {
    width: '100%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontFamily: 'Manrope_700Bold'
  },
  emptyBody: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 6
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  cardHighlight: {
    borderColor: 'rgba(14, 165, 233, 0.3)',
    backgroundColor: 'rgba(14, 165, 233, 0.08)'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  cardSymbol: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  cardName: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  sparkline: {
    marginVertical: 10,
    height: 64,
    backgroundColor: COLORS.soft,
    borderRadius: 10,
    padding: 6
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardPrice: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold'
  },
  changeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8
  },
  changeText: {
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    alignItems: 'center',
    gap: 6
  },
  addText: {
    color: COLORS.muted,
    fontFamily: 'Manrope_600SemiBold'
  }
});
