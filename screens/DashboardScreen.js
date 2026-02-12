import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import { api } from '../api';

const COLORS = {
  primary: '#0ea5e9',
  background: '#f8fafc',
  card: '#ffffff',
  gold: '#b45309',
  success: '#16a34a',
  danger: '#ef4444',
  warning: '#f59e0b',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  soft: '#f1f5f9'
};

const defaultIndices = [
  { label: 'NIFTY 50', value: '22,038.40', change: '+184.20 (0.84%)', up: true },
  { label: 'SENSEX', value: '72,540.30', change: '+560.15 (0.78%)', up: true },
  { label: 'BANK NIFTY', value: '47,215.10', change: '-112.45 (0.24%)', up: false }
];

const defaultTopGainers = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: '2,945.30',
    change: '+4.25%',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtJ_u_H-QT7yehl7yeVXiGZ54-iAu7NH8jH9QZcFeMPAxEeet5CVmcA5R2zieUpSE_hsv2a6ubXF9NwU0nzcUKy97HXfWI9WGyK8J5ghSHcHWAd-3nBG2ygvCk5jDNtHkIQYkSAbgsUG_afOjnSlbPExJuSoyeO2W58_kkHk31fGohsD4PxGXpK3LtBPk7JtI2vMTC_RsyNVno2AGSQlAEjwYdL_GVwyN1krsczhWbaskI8PAFQYbp3rpioiFqm3FsI8UdYVAwjUs'
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    price: '1,442.10',
    change: '+3.80%',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADuEXx08EzfQCkbDAjoVBJx65qJJQfOguvNXMOs4EzgqvfMaZsCU6t8dqvpQUnU6Ncag5ozeOO_xSIq5MhZ15PQO6Sy3yi1LLH4mS315L_3fAuYAGkL9cCxRf5xPn320ChylxG1gWWscm3SXAtziXtsopvhhreopZBC1niCghHKVNH4DDTut2Budyhau-9nuoi5rzok8fzzlQhXJZI4lHwALrCPGT40YT_9AHrH1mfqAbMmXK-Lzu-gq1TgzbEK1K0lpu3NFscbMY'
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: '3,912.45',
    change: '+2.15%',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB92O_jx1kTyDvVIPBhTxtQyu3oaeaovokYAUoipohH4jmL1bcfHaBQp-XQZJc0gpnxpcTifAGaacZ3WGAQnZWxB5WSHf8vQ1neo8x6KkzIfLpEqk5P26x9u79LnQQxN3nXWn_WsXrUUOsrG-k_KRVmymzDc88Ez6-3ynz8AlUf9x2qgjbGiZZGqkQ2wzU8NNkLjupJxACQST7rXoNL83U8m0p75c2bBOOoYY6geVH4iVtzV4hZD-pzFuhHh8L9yRfpgZfNMIdpcuY'
  }
];

const metals = [
  {
    label: 'Gold 24K',
    value: '₹62,450',
    unit: 'Per 10 Grams',
    change: '+0.42%',
    up: true,
    accent: COLORS.gold,
    icon: 'stars'
  },
  {
    label: 'Silver',
    value: '₹71,200',
    unit: 'Per 1 Kilogram',
    change: '-0.15%',
    up: false,
    accent: '#94a3b8',
    icon: 'diamond'
  }
];

const defaultFunds = [
  {
    code: 'SBI',
    name: 'SBI Bluechip Fund',
    meta: 'Direct Growth • 4.8★',
    change: '22.4%',
    period: '3Y CAGR',
    color: '#2563eb'
  },
  {
    code: 'AXS',
    name: 'Axis Small Cap Fund',
    meta: 'Direct Growth • 4.9★',
    change: '28.1%',
    period: '3Y CAGR',
    color: '#dc2626'
  }
];

const segments = ['Stocks', 'MFs', 'Metals', 'Indices'];

const symbolLogos = {
  RELIANCE: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtJ_u_H-QT7yehl7yeVXiGZ54-iAu7NH8jH9QZcFeMPAxEeet5CVmcA5R2zieUpSE_hsv2a6ubXF9NwU0nzcUKy97HXfWI9WGyK8J5ghSHcHWAd-3nBG2ygvCk5jDNtHkIQYkSAbgsUG_afOjnSlbPExJuSoyeO2W58_kkHk31fGohsD4PxGXpK3LtBPk7JtI2vMTC_RsyNVno2AGSQlAEjwYdL_GVwyN1krsczhWbaskI8PAFQYbp3rpioiFqm3FsI8UdYVAwjUs',
  HDFCBANK: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADuEXx08EzfQCkbDAjoVBJx65qJJQfOguvNXMOs4EzgqvfMaZsCU6t8dqvpQUnU6Ncag5ozeOO_xSIq5MhZ15PQO6Sy3yi1LLH4mS315L_3fAuYAGkL9cCxRf5xPn320ChylxG1gWWscm3SXAtziXtsopvhhreopZBC1niCghHKVNH4DDTut2Budyhau-9nuoi5rzok8fzzlQhXJZI4lHwALrCPGT40YT_9AHrH1mfqAbMmXK-Lzu-gq1TgzbEK1K0lpu3NFscbMY',
  TCS: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB92O_jx1kTyDvVIPBhTxtQyu3oaeaovokYAUoipohH4jmL1bcfHaBQp-XQZJc0gpnxpcTifAGaacZ3WGAQnZWxB5WSHf8vQ1neo8x6KkzIfLpEqk5P26x9u79LnQQxN3nXWn_WsXrUUOsrG-k_KRVmymzDc88Ez6-3ynz8AlUf9x2qgjbGiZZGqkQ2wzU8NNkLjupJxACQST7rXoNL83U8m0p75c2bBOOoYY6geVH4iVtzV4hZD-pzFuhHh8L9yRfpgZfNMIdpcuY'
};

const formatNumber = (value, digits = 2) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '--';
  }
  return Number(value).toLocaleString('en-IN', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
};

const marketPulse = {
  sentiment: 'Bullish',
  score: '72/100',
  breadth: '68% Advancers',
  volatility: 'VIX 12.8',
  volume: '1.4x Avg',
  highlight: 'Banks and IT lead the rally with steady midcaps.'
};

const heatmapSectors = [
  { label: 'IT', change: '+1.8%', color: '#22c55e' },
  { label: 'BANKS', change: '+0.9%', color: '#16a34a' },
  { label: 'AUTO', change: '-0.6%', color: '#f97316' },
  { label: 'ENERGY', change: '+0.4%', color: '#86efac' },
  { label: 'PHARMA', change: '-1.2%', color: '#ef4444' },
  { label: 'METALS', change: '+0.2%', color: '#34d399' }
];

const quickActions = [
  { label: 'Set Alert', icon: 'notifications-active' },
  { label: 'Watchlist', icon: 'star-outline' },
  { label: 'Daily Brief', icon: 'article' },
  { label: 'Screeners', icon: 'filter-alt' }
];

const autoInsights = [
  { title: 'Financials overweight by 9%', detail: 'Consider FMCG to balance risk.' },
  { title: 'Top gainers driven by earnings', detail: 'Momentum is strongest in large caps.' },
  { title: 'MF inflows rising week-on-week', detail: 'Mid-cap funds see higher SIPs.' }
];

const alertItems = [
  { label: 'BANK NIFTY high volume', tone: 'warning' },
  { label: 'Reliance +2.5% spike', tone: 'success' },
  { label: 'IT sector volatility rising', tone: 'danger' }
];

const newsItems = [
  {
    title: 'RBI keeps rates steady; liquidity remains supportive',
    source: 'RBI',
    time: '2h ago',
    tag: 'Macro'
  },
  {
    title: 'Large-cap IT beats expectations in early earnings',
    source: 'MarketWire',
    time: '4h ago',
    tag: 'Earnings'
  },
  {
    title: 'Foreign inflows rebound after three-week outflow',
    source: 'Exchange',
    time: '6h ago',
    tag: 'Flows'
  }
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [activeSegment, setActiveSegment] = useState('Stocks');
  const [indices, setIndices] = useState(defaultIndices);
  const [topGainers, setTopGainers] = useState(defaultTopGainers);
  const [funds, setFunds] = useState(defaultFunds);
  const [newsItemsLive, setNewsItemsLive] = useState(newsItems);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = React.useCallback(async () => {
    const [indicesData, stocksData, fundsData, newsData] = await Promise.all([
      api.getIndices(),
      api.getStocks(),
      api.getMutualFunds(),
      api.getNews()
    ]);

    if (indicesData.length) {
      setIndices(
        indicesData.map((item) => ({
          label: item.label,
          value: formatNumber(item.price),
          change: `${item.change >= 0 ? '+' : ''}${formatNumber(item.change)} (${formatNumber(item.changePercent, 2)}%)`,
          up: item.change >= 0
        }))
      );
    }

    if (stocksData.length) {
      const gainers = [...stocksData]
        .sort((a, b) => (b.changePercent || 0) - (a.changePercent || 0))
        .slice(0, 3)
        .map((stock) => {
          const symbol = String(stock.symbol).replace('.BSE', '');
          return {
            symbol,
            name: stock.name || symbol,
            price: formatNumber(stock.price),
            change: `${stock.changePercent >= 0 ? '+' : ''}${formatNumber(stock.changePercent, 2)}%`,
            logo: symbolLogos[symbol] || `https://picsum.photos/seed/${symbol}/100`
          };
        });
      if (gainers.length) {
        setTopGainers(gainers);
      }
    }

    if (fundsData.length) {
      setFunds(
        fundsData.slice(0, 2).map((fund, index) => ({
          code: String(fund.code).slice(-3).toUpperCase(),
          name: fund.name,
          meta: `NAV ₹${formatNumber(fund.nav)} • ${formatNumber(fund.changePercent, 2)}%`,
          change: `${fund.returnPercent ? formatNumber(fund.returnPercent, 1) : formatNumber(fund.changePercent, 2)}%`,
          period: fund.period || '1Y Return',
          color: index === 0 ? '#2563eb' : '#dc2626'
        }))
      );
    }

    if (newsData.length) {
      setNewsItemsLive(
        newsData.slice(0, 3).map((item) => ({
          title: item.title,
          source: item.source,
          time: item.time,
          tag: item.category || 'Market'
        }))
      );
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
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <MaterialIcons name="insights" size={18} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.headerLabel}>Market Center</Text>
              <Text style={styles.headerValue}>Live share market + MF updates</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.headerButton}>
              <MaterialIcons name="search" size={18} color={COLORS.primary} />
            </Pressable>
            <Pressable style={styles.headerButton}>
              <MaterialIcons name="notifications" size={18} color={COLORS.primary} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>
        </View>

        <View style={styles.marketPulseCard}>
          <LinearGradient
            colors={['#e0f2fe', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.marketPulseGradient}
          >
            <View style={styles.marketPulseHeader}>
              <View>
                <Text style={styles.marketPulseLabel}>Smart Market Pulse</Text>
                <Text style={styles.marketPulseValue}>{marketPulse.sentiment}</Text>
              </View>
              <View style={styles.marketPulseScore}>
                <Text style={styles.marketPulseScoreText}>{marketPulse.score}</Text>
              </View>
            </View>
            <Text style={styles.marketPulseNote}>{marketPulse.highlight}</Text>
            <View style={styles.marketPulseStats}>
              <View style={styles.marketPulseStat}>
                <Text style={styles.marketPulseStatLabel}>Breadth</Text>
                <Text style={styles.marketPulseStatValue}>{marketPulse.breadth}</Text>
              </View>
              <View style={styles.marketPulseStat}>
                <Text style={styles.marketPulseStatLabel}>Volatility</Text>
                <Text style={styles.marketPulseStatValue}>{marketPulse.volatility}</Text>
              </View>
              <View style={styles.marketPulseStat}>
                <Text style={styles.marketPulseStatLabel}>Volume</Text>
                <Text style={styles.marketPulseStatValue}>{marketPulse.volume}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <Pressable
              key={action.label}
              style={styles.quickActionChip}
              onPress={() => {
                if (action.label === 'Watchlist') {
                  navigation.navigate('Watchlist');
                }
              }}
            >
              <MaterialIcons name={action.icon} size={16} color={COLORS.primary} />
              <Text style={styles.quickActionText}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionMarker, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.sectionTitle}>Heatmap Strip</Text>
          </View>
          <Text style={styles.sectionMeta}>Sector moves</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.heatmapRow}
        >
          {heatmapSectors.map((sector) => (
            <View key={sector.label} style={[styles.heatmapTile, { backgroundColor: sector.color }]}>
              <Text style={styles.heatmapLabel}>{sector.label}</Text>
              <Text style={styles.heatmapChange}>{sector.change}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tickerRow}
        >
          {indices.map((item) => (
            <View
              key={item.label}
              style={[
                styles.tickerCard,
                { borderLeftColor: item.up ? COLORS.success : COLORS.danger }
              ]}
            >
              <Text style={styles.tickerLabel}>{item.label}</Text>
              <Text style={styles.tickerValue}>{item.value}</Text>
              <View style={styles.tickerChangeRow}>
                <MaterialIcons
                  name={item.up ? 'trending-up' : 'trending-down'}
                  size={12}
                  color={item.up ? COLORS.success : COLORS.danger}
                />
                <Text
                  style={[
                    styles.tickerChange,
                    { color: item.up ? COLORS.success : COLORS.danger }
                  ]}
                >
                  {item.change}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.segmentedControl}>
          {segments.map((segment) => {
            const isActive = segment === activeSegment;
            return (
              <Pressable
                key={segment}
                style={[styles.segmentChip, isActive && styles.segmentChipActive]}
                onPress={() => {
                  setActiveSegment(segment);
                  if (segment === 'MFs') {
                    navigation.getParent()?.navigate('MutualFunds');
                  }
                }}
              >
                <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
                  {segment}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionMarker, { backgroundColor: COLORS.warning }]} />
            <Text style={styles.sectionTitle}>Alert Center</Text>
          </View>
          <Text style={styles.sectionMeta}>Live triggers</Text>
        </View>
        <View style={styles.alertRow}>
          {alertItems.map((alert) => (
            <View
              key={alert.label}
              style={[
                styles.alertChip,
                alert.tone === 'success' && styles.alertChipSuccess,
                alert.tone === 'warning' && styles.alertChipWarning,
                alert.tone === 'danger' && styles.alertChipDanger
              ]}
            >
              <Text style={styles.alertText}>{alert.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionMarker, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.sectionTitle}>Auto-Insights</Text>
          </View>
          <Text style={styles.sectionMeta}>Portfolio signals</Text>
        </View>
        <View style={styles.insightList}>
          {autoInsights.map((insight) => (
            <View key={insight.title} style={styles.insightCard}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDetail}>{insight.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionMarker, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.sectionTitle}>Top Gainers</Text>
          </View>
          <Pressable>
            <Text style={styles.sectionAction}>View All</Text>
          </Pressable>
        </View>
        <View style={styles.sectionList}>
          {topGainers.map((item) => (
            <View key={item.symbol} style={styles.gainerCard}>
              <View style={styles.gainerLeft}>
                <View style={styles.logoBox}>
                  <Image source={{ uri: item.logo }} style={styles.logoImage} />
                </View>
                <View>
                  <Text style={styles.gainerSymbol}>{item.symbol}</Text>
                  <Text style={styles.gainerName}>{item.name}</Text>
                </View>
              </View>
              <View style={styles.gainerRight}>
                <Text style={styles.gainerPrice}>₹{item.price}</Text>
                <Text style={styles.gainerChange}>{item.change}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionMarker, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.sectionTitle}>News That Matters</Text>
          </View>
          <Pressable>
            <Text style={styles.sectionAction}>View All</Text>
          </Pressable>
        </View>
        <View style={styles.newsList}>
          {newsItemsLive.map((item) => (
            <View key={item.title} style={styles.newsCard}>
              <View style={styles.newsTag}>
                <Text style={styles.newsTagText}>{item.tag}</Text>
              </View>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsMeta}>{item.source} · {item.time}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={18} color={COLORS.muted} />
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionMarker, { backgroundColor: COLORS.gold }]} />
            <Text style={styles.sectionTitle}>Metals & Commodities</Text>
          </View>
          <Text style={styles.sectionMeta}>Live MCX</Text>
        </View>
        <View style={styles.metalGrid}>
          {metals.map((metal) => (
            <View key={metal.label} style={styles.metalCard}>
              <View style={[styles.metalIconWrap, { backgroundColor: `${metal.accent}1A` }]}
              >
                <MaterialIcons name={metal.icon} size={28} color={metal.accent} />
              </View>
              <Text style={[styles.metalLabel, { color: metal.accent }]}>{metal.label}</Text>
              <Text style={styles.metalValue}>{metal.value}</Text>
              <Text style={styles.metalUnit}>{metal.unit}</Text>
              <View style={styles.metalFooter}>
                <Text style={[styles.metalChange, { color: metal.up ? COLORS.success : COLORS.danger }]}>
                  {metal.change}
                </Text>
                <View style={styles.metalDivider}>
                  <View style={[styles.metalDividerLine, { backgroundColor: metal.accent }]} />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionMarker, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.sectionTitle}>Top Equity Funds</Text>
          </View>
        </View>
        <View style={styles.fundCard}>
          {funds.map((fund, index) => (
            <View key={fund.code} style={[styles.fundRow, index === 0 && styles.fundRowBorder]}>
              <View style={styles.fundLeft}>
                <View style={[styles.fundBadge, { backgroundColor: fund.color }]}>
                  <Text style={styles.fundBadgeText}>{fund.code}</Text>
                </View>
                <View>
                  <Text style={styles.fundTitle}>{fund.name}</Text>
                  <Text style={styles.fundMeta}>{fund.meta}</Text>
                </View>
              </View>
              <View style={styles.fundRight}>
                <Text style={styles.fundChange}>{fund.change}</Text>
                <Text style={styles.fundPeriod}>{fund.period}</Text>
              </View>
            </View>
          ))}
        </View>
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
    paddingBottom: 140,
    paddingTop: 8
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  headerValue: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Manrope_700Bold',
    marginTop: 4
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: COLORS.background
  },
  tickerRow: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 12
  },
  tickerCard: {
    width: 150,
    borderRadius: 16,
    padding: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3
  },
  tickerLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  tickerValue: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Manrope_800ExtraBold',
    marginTop: 6
  },
  tickerChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6
  },
  tickerChange: {
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  marketPulseCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
    marginBottom: 16
  },
  marketPulseGradient: {
    padding: 18
  },
  marketPulseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  marketPulseLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  marketPulseValue: {
    color: COLORS.text,
    fontSize: 22,
    fontFamily: 'Manrope_800ExtraBold',
    marginTop: 4
  },
  marketPulseScore: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10
  },
  marketPulseScoreText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  marketPulseNote: {
    color: COLORS.muted,
    fontSize: 12,
    fontFamily: 'Manrope_500Medium',
    marginTop: 10
  },
  marketPulseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 10
  },
  marketPulseStat: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  marketPulseStatLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase'
  },
  marketPulseStatValue: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold',
    marginTop: 4
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 18
  },
  quickActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  quickActionText: {
    color: COLORS.text,
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  heatmapRow: {
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 16
  },
  heatmapTile: {
    width: 110,
    borderRadius: 16,
    padding: 12
  },
  heatmapLabel: {
    color: '#0f172a',
    fontSize: 11,
    fontFamily: 'Manrope_800ExtraBold'
  },
  heatmapChange: {
    color: '#0f172a',
    fontSize: 12,
    fontFamily: 'Manrope_700Bold',
    marginTop: 6
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginHorizontal: 20,
    padding: 4,
    gap: 4,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  segmentChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center'
  },
  segmentChipActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 }
  },
  segmentText: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  segmentTextActive: {
    color: '#ffffff'
  },
  portfolioCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(19,236,236,0.2)'
  },
  portfolioGradient: {
    padding: 18
  },
  portfolioGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(19,236,236,0.12)'
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  portfolioLabel: {
    color: 'rgba(19,236,236,0.8)',
    fontSize: 10,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  portfolioValue: {
    color: COLORS.success,
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    marginTop: 4
  },
  portfolioBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(57,255,20,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  portfolioBadgeText: {
    color: COLORS.success,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  portfolioGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16
  },
  portfolioMiniCard: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  portfolioMiniLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase'
  },
  portfolioMiniValue: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Manrope_800ExtraBold',
    marginTop: 6
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sectionMarker: {
    width: 6,
    height: 22,
    borderRadius: 999
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold'
  },
  sectionAction: {
    color: COLORS.primary,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  sectionMeta: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  sectionList: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20
  },
  alertRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  alertChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  alertChipSuccess: {
    backgroundColor: 'rgba(22, 163, 74, 0.12)',
    borderColor: 'rgba(22, 163, 74, 0.25)'
  },
  alertChipWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.25)'
  },
  alertChipDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.25)'
  },
  alertText: {
    color: COLORS.text,
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  insightList: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20
  },
  insightCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  insightTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  insightDetail: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'Manrope_500Medium',
    marginTop: 6
  },
  newsList: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  newsTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(14, 165, 233, 0.12)'
  },
  newsTagText: {
    color: COLORS.primary,
    fontSize: 9,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase'
  },
  newsContent: {
    flex: 1
  },
  newsTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  newsMeta: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
    marginTop: 6
  },
  gainerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.success
  },
  gainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  gainerSymbol: {
    color: COLORS.text,
    fontSize: 13,
    fontFamily: 'Manrope_800ExtraBold'
  },
  gainerName: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_500Medium'
  },
  gainerRight: {
    alignItems: 'flex-end'
  },
  gainerPrice: {
    color: COLORS.text,
    fontSize: 13,
    fontFamily: 'Manrope_800ExtraBold'
  },
  gainerChange: {
    color: COLORS.success,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  metalGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  metalCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  metalIconWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  metalLabel: {
    fontSize: 10,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  metalValue: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold',
    marginTop: 8
  },
  metalUnit: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
    marginTop: 4
  },
  metalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14
  },
  metalChange: {
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  metalDivider: {
    width: 48,
    height: 8,
    borderRadius: 6,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  metalDividerLine: {
    width: 30,
    height: 2,
    borderRadius: 2
  },
  fundCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card
  },
  fundRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  fundRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)'
  },
  fundLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  fundBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fundBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Manrope_800ExtraBold'
  },
  fundTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  fundMeta: {
    color: COLORS.muted,
    fontSize: 9,
    fontFamily: 'Manrope_500Medium'
  },
  fundRight: {
    alignItems: 'flex-end'
  },
  fundChange: {
    color: COLORS.success,
    fontSize: 12,
    fontFamily: 'Manrope_800ExtraBold'
  },
  fundPeriod: {
    color: COLORS.muted,
    fontSize: 9,
    fontFamily: 'Manrope_500Medium'
  }
});
