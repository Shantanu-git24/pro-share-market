import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#1111d4',
  success: '#0bda68',
  danger: '#ff4d4d',
  background: '#101022',
  surface: '#161633',
  muted: '#9292c9'
};

export default function StockDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const symbol = route.params?.symbol || 'TSLA';
  const name = symbol === 'TSLA' ? 'Tesla Motors, Inc.' : 'Stock Corporation';

  return (
    <Screen style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={18} color="white" />
          </Pressable>
          <View>
            <Text style={styles.headerSymbol}>{symbol}</Text>
            <Text style={styles.headerName}>{name}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.glassIcon}>
            <MaterialIcons name="star" size={18} color="white" />
          </Pressable>
          <Pressable style={styles.glassIcon}>
            <MaterialIcons name="share" size={18} color="white" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.heroRow}>
          <View>
            <View style={styles.priceRow}>
              <Text style={styles.price}>$175.22</Text>
              <View style={styles.deltaRow}>
                <MaterialIcons name="arrow-upward" size={14} color={COLORS.success} />
                <Text style={styles.deltaText}>2.41%</Text>
              </View>
            </View>
            <Text style={styles.closedText}>Closed: Mar 22, 4:00 PM EDT</Text>
          </View>
          <View style={styles.marketStatus}>
            <Text style={styles.marketStatusText}>Market Open</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <View style={styles.rangeRow}>
            {['1D', '1W', '1M', '1Y', 'ALL'].map((label, index) => (
              <Pressable key={label} style={[styles.rangeChip, index === 0 && styles.rangeChipActive]}>
                <Text style={[styles.rangeText, index === 0 && styles.rangeTextActive]}>{label}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.candleButton}>
              <MaterialIcons name="show-chart" size={18} color={COLORS.muted} />
            </Pressable>
          </View>
          <View style={styles.chartBox}>
            <View style={styles.chartGradient} />
            <Svg width="100%" height="100%" viewBox="0 0 480 150" preserveAspectRatio="none">
              <Defs>
                <SvgGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={COLORS.primary} stopOpacity="0.2" />
                  <Stop offset="1" stopColor={COLORS.primary} stopOpacity="0" />
                </SvgGradient>
              </Defs>
              <Path
                d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25"
                stroke={COLORS.primary}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <Path
                d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25V150H0V109Z"
                fill="url(#chartFill)"
              />
            </Svg>
            <View style={styles.chartGrid}>
              {Array.from({ length: 4 }).map((_, index) => (
                <View key={`grid-${index}`} style={styles.gridLine} />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.indicatorToggle}>
          {['RSI', 'MACD', 'Volume'].map((label, index) => (
            <Pressable key={label} style={[styles.indicatorPill, index === 0 && styles.indicatorActive]}>
              <Text style={[styles.indicatorText, index === 0 && styles.indicatorTextActive]}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Order Book</Text>
          <Text style={styles.sectionMeta}>Spread: 0.01 (0.005%)</Text>
        </View>

        <View style={styles.orderBookRow}>
          <View style={styles.orderColumn}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderHeaderText}>Size</Text>
              <Text style={styles.orderHeaderText}>Bid Price</Text>
            </View>
            {['1.2k', '0.8k', '2.5k'].map((size, index) => (
              <View key={`bid-${size}`} style={styles.bidRow}>
                <Text style={styles.orderSize}>{size}</Text>
                <Text style={styles.bidPrice}>175.2{index}</Text>
              </View>
            ))}
          </View>
          <View style={styles.orderColumn}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderHeaderText}>Ask Price</Text>
              <Text style={styles.orderHeaderText}>Size</Text>
            </View>
            {['0.9k', '3.1k', '1.4k'].map((size, index) => (
              <View key={`ask-${size}`} style={styles.askRow}>
                <Text style={styles.askPrice}>175.2{index + 1}</Text>
                <Text style={styles.orderSize}>{size}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Fundamentals</Text>
        <View style={styles.fundamentalsGrid}>
          {[
            { label: 'Market Cap', value: '556.24B' },
            { label: 'P/E Ratio', value: '40.12' },
            { label: '52W High', value: '299.29' },
            { label: 'Avg Vol', value: '102.4M' }
          ].map((item) => (
            <View key={item.label} style={styles.fundamentalCard}>
              <Text style={styles.fundamentalLabel}>{item.label}</Text>
              <Text style={styles.fundamentalValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.tradePanel}>
        <View style={styles.tradeRow}>
          <View>
            <Text style={styles.tradeLabel}>Quantity</Text>
            <View style={styles.tradeValueRow}>
              <Text style={styles.tradeValue}>10</Text>
              <Text style={styles.tradeUnit}>Shares</Text>
            </View>
          </View>
          <View style={styles.tradeTotal}>
            <Text style={styles.tradeLabel}>Est. Total</Text>
            <Text style={styles.tradeValue}>$1,752.20</Text>
          </View>
        </View>
        <View style={styles.tradeButtons}>
          <Pressable style={styles.sellBtn}>
            <MaterialIcons name="trending-down" size={18} color="white" />
            <Text style={styles.tradeBtnText}>SELL</Text>
          </Pressable>
          <Pressable style={styles.buyBtn}>
            <MaterialIcons name="trending-up" size={18} color="white" />
            <Text style={styles.tradeBtnText}>BUY</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f213f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerSymbol: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  headerName: {
    color: COLORS.muted,
    fontSize: 12,
    fontFamily: 'Manrope_500Medium'
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8
  },
  glassIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(35,35,72,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  scroll: {
    paddingBottom: 220
  },
  heroRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8
  },
  price: {
    color: 'white',
    fontSize: 34,
    fontFamily: 'Manrope_800ExtraBold'
  },
  deltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  deltaText: {
    color: COLORS.success,
    fontFamily: 'Manrope_700Bold'
  },
  closedText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 6
  },
  marketStatus: {
    backgroundColor: 'rgba(11,218,104,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  marketStatusText: {
    color: COLORS.success,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  chartSection: {
    paddingHorizontal: 16
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12
  },
  rangeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#232348'
  },
  rangeChipActive: {
    backgroundColor: COLORS.primary
  },
  rangeText: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  rangeTextActive: {
    color: 'white'
  },
  candleButton: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#232348',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chartBox: {
    height: 240,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden'
  },
  chartGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(17,17,212,0.08)'
  },
  chartGrid: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'space-around',
    paddingVertical: 16
  },
  gridLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  indicatorToggle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#232348',
    borderRadius: 12,
    padding: 4
  },
  indicatorPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8
  },
  indicatorActive: {
    backgroundColor: '#111122'
  },
  indicatorText: {
    color: COLORS.muted,
    fontFamily: 'Manrope_600SemiBold'
  },
  indicatorTextActive: {
    color: 'white'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
    alignItems: 'center'
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    marginLeft: 16,
    marginTop: 24
  },
  sectionMeta: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'Manrope_500Medium'
  },
  orderBookRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginHorizontal: 16
  },
  orderColumn: {
    flex: 1
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  orderHeaderText: {
    color: '#94a3b8',
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  bidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(11,218,104,0.05)',
    borderLeftWidth: 2,
    borderLeftColor: COLORS.success,
    marginBottom: 6
  },
  askRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,77,77,0.05)',
    borderRightWidth: 2,
    borderRightColor: COLORS.danger,
    marginBottom: 6
  },
  orderSize: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Manrope_500Medium'
  },
  bidPrice: {
    color: COLORS.success,
    fontFamily: 'Manrope_700Bold'
  },
  askPrice: {
    color: COLORS.danger,
    fontFamily: 'Manrope_700Bold'
  },
  fundamentalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16
  },
  fundamentalCard: {
    width: '48%',
    backgroundColor: '#1a1a3a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  fundamentalLabel: {
    color: COLORS.muted,
    fontSize: 11,
    marginBottom: 4
  },
  fundamentalValue: {
    color: 'white',
    fontFamily: 'Manrope_700Bold'
  },
  tradePanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 24,
    backgroundColor: 'rgba(35,35,72,0.4)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  tradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  tradeLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#94a3b8',
    fontFamily: 'Manrope_700Bold'
  },
  tradeValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6
  },
  tradeValue: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold'
  },
  tradeUnit: {
    color: '#94a3b8',
    fontSize: 12
  },
  tradeTotal: {
    alignItems: 'flex-end'
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: 12
  },
  sellBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.danger,
    borderRadius: 14,
    paddingVertical: 14
  },
  buyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14
  },
  tradeBtnText: {
    color: 'white',
    fontFamily: 'Manrope_800ExtraBold'
  }
});
