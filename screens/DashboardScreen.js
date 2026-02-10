import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#1111d4',
  accent: '#0bda68',
  background: '#0a0a14',
  surface: '#1a1a2e',
  muted: '#9292c9',
  light: '#f6f6f8'
};

const tickerItems = [
  'S&P 500 5,204.34 (+0.45%)',
  'NASDAQ 16,274.94 (+1.23%)',
  'DOW 38,904.04 (-0.12%)',
  'BTC $64,231.20 (+3.1%)',
  'AAPL $189.42 (+1.24%)'
];

const watchlist = [
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 171.05, change: -2.44 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 4.12 },
  { symbol: 'BTC', name: 'Bitcoin', price: 64231, change: 1.89 }
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [isDark, setIsDark] = useState(true);

  const theme = isDark
    ? {
      background: '#0a0a14',
      surface: '#1a1a2e',
      text: '#ffffff',
      subtext: '#9da5bd',
      muted: '#9292c9',
      border: 'rgba(255,255,255,0.08)',
      glass: 'rgba(255,255,255,0.08)',
      chip: 'rgba(255,255,255,0.08)'
    }
    : {
      background: '#f6f6f8',
      surface: '#ffffff',
      text: '#0b0b14',
      subtext: '#6b7280',
      muted: '#6b7280',
      border: '#e5e7eb',
      glass: '#ffffff',
      chip: '#e5e7eb'
    };

  const iconColor = isDark ? 'white' : '#0b0b14';
  const toggleIcon = isDark ? 'nightlight-round' : 'wb-sunny';
  const gradientColors = isDark ? [COLORS.primary, '#050520'] : ['#e0e7ff', '#c7d2fe'];

  return (
    <Screen style={[styles.root, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.tickerWrap, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tickerRow}>
            {tickerItems.concat(tickerItems).map((item, index) => (
              <Text key={`${item}-${index}`} style={[styles.tickerText, { color: theme.subtext }]}>
                {item}
              </Text>
            ))}
          </ScrollView>
        </View>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={[styles.menuButton, { backgroundColor: isDark ? 'rgba(17,17,212,0.2)' : '#e5e7eb' }]}>
              <MaterialIcons name="menu" size={20} color={iconColor} />
            </Pressable>
            <Text style={[styles.headerTitle, { color: theme.text }]}>ProTrader</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable
              style={[styles.toggleShell, { backgroundColor: theme.chip, borderColor: theme.border }]}
              onPress={() => setIsDark((prev) => !prev)}
            >
              <View style={[styles.toggleThumb, { alignSelf: isDark ? 'flex-start' : 'flex-end', backgroundColor: isDark ? '#ffffff' : '#0b0b14' }]}
              >
                <MaterialIcons name={toggleIcon} size={14} color={isDark ? '#0b0b14' : '#f59e0b'} />
              </View>
            </Pressable>
            <Pressable style={[styles.iconButton, { backgroundColor: theme.glass }]}
            >
              <MaterialIcons name="notifications" size={18} color={iconColor} />
            </Pressable>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirObAa2MjIWPa-3boALnjbdRJaqIm4RdAgYiDEC9g-kR1zaGa7RMBrNTVp4vqykvIPv-wmHATAXI9LL3ZWts3jiQuqk5_mu5NvcbEsFonXs_d3nxKrgjHIM4g-1hqa3IHWby7WBs8RqprHFfG_oa6kLdouCbZnUsA6DIa6Ji0Qp_HqmIxRpEbQHmtgNzO39fFVi4GRagnh1oWuWnPb--ViM4PwXZXGa11gNrdjyInHRpZzBi3Ym-QM27gHLO5DEK6awQFi5kKzh8' }}
              style={styles.avatar}
            />
          </View>
        </View>

        <View style={[styles.searchWrap, { backgroundColor: theme.glass, borderColor: theme.border }]}
        >
          <MaterialIcons name="search" size={18} color={theme.muted} />
          <TextInput
            placeholder="Search AAPL, TSLA, BTC..."
            placeholderTextColor={theme.muted}
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRow}>
          <LinearGradient colors={gradientColors} style={styles.balanceCard}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardLabel, { color: isDark ? 'rgba(255,255,255,0.7)' : '#475569' }]}>Total Balance</Text>
              <MaterialIcons name="account-balance-wallet" size={16} color="rgba(255,255,255,0.4)" />
            </View>
            <Text style={[styles.cardValue, { color: isDark ? 'white' : '#0b0b14' }]}>$42,950.00</Text>
            <View style={styles.cardDelta}>
              <MaterialIcons name="trending-up" size={14} color={COLORS.accent} />
              <Text style={[styles.cardDeltaText, { color: COLORS.accent }]}>+5.2% <Text style={[styles.cardDeltaMuted, { color: isDark ? 'rgba(255,255,255,0.5)' : '#64748b' }]}>today</Text></Text>
            </View>
          </LinearGradient>
          <View style={[styles.glassCard, { backgroundColor: theme.glass, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardLabel, { color: theme.subtext }]}>Profit / Loss</Text>
              <MaterialIcons name="payments" size={16} color="rgba(255,255,255,0.4)" />
            </View>
            <Text style={[styles.cardValue, { color: theme.text }]}>+$1,240.50</Text>
            <View style={styles.cardDelta}>
              <MaterialIcons name="north-east" size={14} color={COLORS.accent} />
              <Text style={[styles.cardDeltaText, { color: COLORS.accent }]}>+2.1% <Text style={[styles.cardDeltaMuted, { color: isDark ? 'rgba(255,255,255,0.5)' : '#64748b' }]}>all time</Text></Text>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.chartCard, { backgroundColor: theme.glass, borderColor: theme.border }]}>
          <View style={styles.chartHeader}>
            <View>
              <View style={styles.tickerRowMini}>
                <View style={styles.logoDot}>
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYjlzDp0gfGXY_8sNzjVwgacSobRqHmEfJ2sAH9wpk-5-AH3KSxuN0lkzoywJyvt0vgG8VuUJ2Ma1rRcWZjh1MqvDIpTzMXv_H-K-NN1DOn1H2EpBzPYyWePRFAGBR0aQ2QmOP_AiWFl4T38mVVQqVVwa8qFAI_86_9x5XHLqZXLr9d1jjvy6yB_hzCYb85ch8NJokNztPHXeRzwY4JX6L7cM4TMPX43VfnWEpQECf_PwQiVQ3xG6PYy77OErsM-9efwdOoTSGziM' }}
                    style={styles.logoImg}
                  />
                </View>
                <Text style={[styles.tickerLabel, { color: theme.subtext }]}>AAPL - Apple Inc.</Text>
              </View>
              <Text style={[styles.chartPrice, { color: theme.text }]}>$189.42</Text>
            </View>
            <View style={styles.chartRight}>
              <Text style={[styles.chartChange, { color: COLORS.accent }]}>+1.24%</Text>
              <Text style={[styles.chartRealTime, { color: isDark ? 'rgba(255,255,255,0.4)' : '#64748b' }]}>REAL-TIME</Text>
            </View>
          </View>
          <View style={[styles.rangeRow, { backgroundColor: theme.chip }]}>
            {['1D', '1W', '1M', '1Y', 'ALL'].map((label, index) => (
              <Pressable key={label} style={[styles.rangeChip, index === 0 && styles.rangeChipActive]}>
                <Text style={[styles.rangeText, { color: index === 0 ? 'white' : theme.subtext }]}>{label}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.chartWrap}>
            <Svg width="100%" height="100%" viewBox="0 0 478 150" preserveAspectRatio="none">
              <Defs>
                <SvgGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={COLORS.primary} stopOpacity="0.4" />
                  <Stop offset="1" stopColor={COLORS.primary} stopOpacity="0" />
                </SvgGradient>
              </Defs>
              <Path
                d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25V149H0V109Z"
                fill="url(#chartGradient)"
              />
              <Path
                d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25"
                stroke="#00d4ff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
          </View>
          <View style={styles.chartTimes}>
            {['09:30 AM', '11:30 AM', '01:30 PM', '03:30 PM'].map((time) => (
              <Text key={time} style={styles.chartTimeText}>{time}</Text>
            ))}
          </View>
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.buyButton}>
            <Text style={styles.buyText}>BUY AAPL</Text>
          </Pressable>
          <Pressable style={[styles.sellButton, { backgroundColor: theme.glass, borderColor: theme.border }]}>
            <Text style={[styles.sellText, { color: theme.text }]}>SELL AAPL</Text>
          </Pressable>
        </View>

        <View style={styles.watchHeader}>
          <Text style={[styles.watchTitle, { color: theme.text }]}>Watchlist</Text>
          <Pressable onPress={() => navigation.navigate('Watchlist')}>
            <Text style={styles.watchAction}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.watchList}>
          {watchlist.map((item) => (
            <Pressable
              key={item.symbol}
              style={[styles.watchItem, { backgroundColor: theme.glass }]}
              onPress={() => navigation.navigate('StockDetail', { symbol: item.symbol })}
            >
              <View style={styles.watchLeft}>
                <View style={styles.watchBadge}>
                  <Text style={styles.watchBadgeText}>{item.symbol}</Text>
                </View>
                <View>
                  <Text style={[styles.watchName, { color: theme.text }]}>{item.name}</Text>
                  <Text style={[styles.watchShares, { color: isDark ? 'rgba(255,255,255,0.4)' : '#64748b' }]}>182.34 Shares</Text>
                </View>
              </View>
              <View style={styles.watchRight}>
                <Text style={[styles.watchPrice, { color: theme.text }]}>${item.price.toLocaleString()}</Text>
                <Text style={[styles.watchChange, item.change >= 0 ? styles.changeUp : styles.changeDown]}>
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </Text>
              </View>
            </Pressable>
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
    paddingBottom: 120
  },
  tickerWrap: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(5,5,10,0.9)',
    paddingVertical: 8
  },
  tickerRow: {
    paddingHorizontal: 16,
    gap: 18
  },
  tickerText: {
    color: '#9da5bd',
    fontSize: 10,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold'
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(17,17,212,0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  toggleShell: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: 'rgba(17,17,212,0.3)',
    padding: 3,
    justifyContent: 'center'
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginTop: 8
  },
  searchInput: {
    flex: 1,
    color: 'white',
    paddingVertical: 12,
    marginLeft: 8
  },
  cardRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12
  },
  balanceCard: {
    width: 260,
    borderRadius: 20,
    padding: 16
  },
  glassCard: {
    width: 260,
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontFamily: 'Manrope_500Medium'
  },
  cardValue: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold',
    marginTop: 6
  },
  cardDelta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6
  },
  cardDeltaText: {
    color: COLORS.accent,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  cardDeltaMuted: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Manrope_500Medium'
  },
  chartCard: {
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  tickerRowMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  logoDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImg: {
    width: 14,
    height: 14
  },
  tickerLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  chartPrice: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'Manrope_800ExtraBold',
    marginTop: 6
  },
  chartRight: {
    alignItems: 'flex-end'
  },
  chartChange: {
    color: COLORS.accent,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  chartRealTime: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontFamily: 'Manrope_500Medium'
  },
  rangeRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 4,
    gap: 6
  },
  rangeChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 8
  },
  rangeChipActive: {
    backgroundColor: COLORS.primary
  },
  rangeText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Manrope_700Bold'
  },
  rangeTextActive: {
    color: 'white'
  },
  chartWrap: {
    height: 160,
    marginTop: 12
  },
  chartTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  chartTimeText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    fontFamily: 'Manrope_700Bold'
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  buyButton: {
    flex: 1,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  buyText: {
    color: '#0a0a14',
    fontFamily: 'Manrope_800ExtraBold'
  },
  sellButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  sellText: {
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold'
  },
  watchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12
  },
  watchTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  watchAction: {
    color: COLORS.primary,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  watchList: {
    paddingHorizontal: 16,
    gap: 12
  },
  watchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  watchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  watchBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#232348',
    alignItems: 'center',
    justifyContent: 'center'
  },
  watchBadgeText: {
    color: COLORS.primary,
    fontFamily: 'Manrope_700Bold'
  },
  watchName: {
    color: 'white',
    fontFamily: 'Manrope_700Bold'
  },
  watchShares: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontFamily: 'Manrope_500Medium'
  },
  watchRight: {
    alignItems: 'flex-end'
  },
  watchPrice: {
    color: 'white',
    fontFamily: 'Manrope_700Bold'
  },
  watchChange: {
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  changeUp: {
    color: COLORS.accent
  },
  changeDown: {
    color: '#ef4444'
  }
});
