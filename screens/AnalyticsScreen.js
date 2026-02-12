import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import { api } from '../api';
import { useFocusEffect } from '@react-navigation/native';

const COLORS = {
  primary: '#0ea5e9',
  background: '#f8fafc',
  neonGreen: '#16a34a',
  mutedCoral: '#ef4444',
  surface: '#ffffff',
  text: '#0f172a',
  border: '#e2e8f0',
  soft: '#f1f5f9'
};

const defaultMovers = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹2,945.30', change: '+1.84%', tone: COLORS.neonGreen },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,442.10', change: '+0.74%', tone: COLORS.neonGreen },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: '₹3,912.45', change: '-0.52%', tone: COLORS.mutedCoral }
];

export default function AnalyticsScreen() {
  const [movers, setMovers] = useState(defaultMovers);
  const [marketSummary, setMarketSummary] = useState({ value: '$124,500.00', delta: '+2.45%' });
  const deltaTone = marketSummary.delta.startsWith('-') ? COLORS.mutedCoral : COLORS.neonGreen;
  const [refreshing, setRefreshing] = useState(false);

  const loadData = React.useCallback(async () => {
    const [indicesData, stocksData] = await Promise.all([
      api.getIndices(),
      api.getStocks()
    ]);

    if (indicesData.length) {
      const avgChange = indicesData.reduce((sum, item) => sum + Number(item.changePercent || 0), 0) / indicesData.length;
      const totalValue = indicesData.reduce((sum, item) => sum + Number(item.price || 0), 0);
      setMarketSummary({
        value: `₹${Number(totalValue).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
        delta: `${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`
      });
    }

    if (stocksData.length) {
      const sorted = [...stocksData].sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0));
      const nextMovers = sorted.slice(0, 3).map((item) => ({
        symbol: String(item.symbol).replace('.BSE', ''),
        name: item.name || item.symbol,
        price: `₹${Number(item.price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
        change: `${item.changePercent >= 0 ? '+' : ''}${Number(item.changePercent).toFixed(2)}%`,
        tone: item.changePercent >= 0 ? COLORS.neonGreen : COLORS.mutedCoral
      }));
      setMovers(nextMovers);
    }
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
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="menu" size={20} color={COLORS.text} />
          </Pressable>
          <Text style={styles.topTitle}>Market Overview</Text>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="notifications" size={20} color={COLORS.text} />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Total Balance</Text>
          <View style={styles.heroRow}>
            <Text style={styles.heroValue}>{marketSummary.value}</Text>
            <Text style={[styles.heroDelta, { color: deltaTone }]}>{marketSummary.delta}</Text>
          </View>
          <View style={styles.heroContent}>
            <View style={styles.donutWrap}>
              <Svg width="100%" height="100%" viewBox="0 0 36 36">
                <Circle cx="18" cy="18" r="16" stroke={COLORS.border} strokeWidth="3.5" fill="transparent" />
                <Circle cx="18" cy="18" r="16" stroke={COLORS.primary} strokeWidth="3.5" fill="transparent" strokeDasharray="60 100" />
                <Circle cx="18" cy="18" r="16" stroke={COLORS.neonGreen} strokeWidth="3.5" fill="transparent" strokeDasharray="20 100" strokeDashoffset="-60" />
                <Circle cx="18" cy="18" r="16" stroke={COLORS.mutedCoral} strokeWidth="3.5" fill="transparent" strokeDasharray="15 100" strokeDashoffset="-80" />
              </Svg>
              <View style={styles.donutCenter}>
                <Text style={styles.donutText}>Diversified</Text>
              </View>
            </View>
            <View style={styles.distribution}>
              {[
                { label: 'Stocks (60%)', color: COLORS.primary },
                { label: 'Crypto (20%)', color: COLORS.neonGreen },
                { label: 'Forex (15%)', color: COLORS.mutedCoral },
                { label: 'Other (5%)', color: COLORS.border }
              ].map((item) => (
                <View key={item.label} style={styles.distRow}>
                  <View style={[styles.distDot, { backgroundColor: item.color }]} />
                  <Text style={styles.distLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Market Trends</Text>
          <View style={styles.timeToggle}>
            {['1D', '1W', '1M', '1Y'].map((label, index) => (
              <View key={label} style={[styles.timeChip, index === 0 && styles.timeChipActive]}>
                <Text style={[styles.timeText, index === 0 && styles.timeTextActive]}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>S&P 500 Index</Text>
              <Text style={styles.chartDelta}>+5.2% Today</Text>
            </View>
            <MaterialIcons name="open-in-full" size={16} color={COLORS.muted} />
          </View>
          <View style={styles.chartWrap}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <Defs>
                <SvgGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={COLORS.neonGreen} stopOpacity="0.2" />
                  <Stop offset="1" stopColor={COLORS.neonGreen} stopOpacity="0" />
                </SvgGradient>
              </Defs>
              <Path d="M0,80 Q10,75 20,85 T40,60 T60,70 T80,40 T100,50 L100,100 L0,100 Z" fill="url(#trend)" />
              <Path d="M0,80 Q10,75 20,85 T40,60 T60,70 T80,40 T100,50" stroke={COLORS.neonGreen} strokeWidth="2" fill="none" />
            </Svg>
          </View>
          <View style={styles.chartTimes}>
            {['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'].map((time) => (
              <Text key={time} style={styles.chartTime}>{time}</Text>
            ))}
          </View>
        </View>

        <View style={styles.moversHeader}>
          <Text style={styles.sectionTitle}>Top Gainers</Text>
          <Text style={styles.moversMuted}>Top Losers</Text>
        </View>

        <View style={styles.moversList}>
          {movers.map((item) => (
            <View key={item.symbol} style={styles.moverCard}>
              <View style={styles.moverLeft}>
                <View style={styles.moverBadge}>
                  <Text style={styles.moverSymbol}>{item.symbol}</Text>
                </View>
                <View>
                  <Text style={styles.moverName}>{item.name}</Text>
                  <Text style={styles.moverExchange}>NASDAQ: {item.symbol}</Text>
                </View>
              </View>
              <View style={styles.moverSpark}>
                <Svg width="100%" height="100%" viewBox="0 0 100 40">
                  <Path d="M0,30 Q25,10 50,30 T100,10" stroke={item.tone} strokeWidth="2" fill="none" />
                </Svg>
              </View>
              <View style={styles.moverRight}>
                <Text style={styles.moverPrice}>{item.price}</Text>
                <Text style={[styles.moverChange, { color: item.tone }]}>{item.change}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Pressable style={styles.fab}>
        <MaterialIcons name="add" size={26} color="white" />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  scroll: {
    paddingBottom: 140
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  hero: {
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12
  },
  heroLabel: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_600SemiBold'
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8
  },
  heroValue: {
    color: COLORS.text,
    fontSize: 28,
    fontFamily: 'Manrope_800ExtraBold'
  },
  heroDelta: {
    color: COLORS.neonGreen,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  donutWrap: {
    width: 110,
    height: 110
  },
  donutCenter: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  donutText: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase'
  },
  distribution: {
    gap: 8
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  distDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  distLabel: {
    color: COLORS.muted,
    fontSize: 11
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  timeToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.soft,
    padding: 4,
    borderRadius: 10,
    gap: 6
  },
  timeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  timeChipActive: {
    backgroundColor: COLORS.primary
  },
  timeText: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  timeTextActive: {
    color: '#ffffff'
  },
  chartCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  chartTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_600SemiBold'
  },
  chartDelta: {
    color: COLORS.neonGreen,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  chartWrap: {
    height: 140
  },
  chartTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  chartTime: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  moversHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    marginTop: 20
  },
  moversMuted: {
    color: COLORS.muted,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  moversList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12
  },
  moverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  moverLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  moverBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  moverSymbol: {
    color: COLORS.neonGreen,
    fontFamily: 'Manrope_700Bold',
    fontSize: 10
  },
  moverName: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  moverExchange: {
    color: COLORS.muted,
    fontSize: 10
  },
  moverSpark: {
    width: 60,
    height: 24
  },
  moverRight: {
    alignItems: 'flex-end'
  },
  moverPrice: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  moverChange: {
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
