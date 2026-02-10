import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#359EFF',
  background: '#0f1923',
  neonGreen: '#39FF14',
  mutedCoral: '#FF7F7F',
  surface: '#15152a'
};

const movers = [
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '$184.21', change: '+4.12%', tone: COLORS.neonGreen },
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$192.42', change: '+2.84%', tone: COLORS.neonGreen },
  { symbol: 'BTC', name: 'Bitcoin', price: '$64,120', change: '-1.22%', tone: COLORS.mutedCoral }
];

export default function AnalyticsScreen() {
  return (
    <Screen style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="menu" size={20} color="white" />
          </Pressable>
          <Text style={styles.topTitle}>Market Overview</Text>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="notifications" size={20} color="white" />
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>Total Balance</Text>
          <View style={styles.heroRow}>
            <Text style={styles.heroValue}>$124,500.00</Text>
            <Text style={styles.heroDelta}>+2.45%</Text>
          </View>
          <View style={styles.heroContent}>
            <View style={styles.donutWrap}>
              <Svg width="100%" height="100%" viewBox="0 0 36 36">
                <Circle cx="18" cy="18" r="16" stroke="rgba(255,255,255,0.05)" strokeWidth="3.5" fill="transparent" />
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
                { label: 'Other (5%)', color: 'rgba(255,255,255,0.2)' }
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
            <MaterialIcons name="open-in-full" size={16} color="rgba(255,255,255,0.3)" />
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
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  hero: {
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 16,
    gap: 12
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.5)',
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
    color: 'white',
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
    color: 'rgba(255,255,255,0.4)',
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
    color: 'rgba(255,255,255,0.7)',
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
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  timeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
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
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  timeTextActive: {
    color: 'white'
  },
  chartCard: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    padding: 16
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  chartTitle: {
    color: 'white',
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
    color: 'rgba(255,255,255,0.3)',
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
    color: 'rgba(255,255,255,0.3)',
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
    padding: 12
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
    backgroundColor: '#0f1923',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moverSymbol: {
    color: COLORS.neonGreen,
    fontFamily: 'Manrope_700Bold',
    fontSize: 10
  },
  moverName: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  moverExchange: {
    color: 'rgba(255,255,255,0.4)',
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
    color: 'white',
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
