import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#1111d4',
  background: '#101022',
  card: '#191933',
  muted: '#9292c9',
  green: '#0bda68',
  red: '#ff3b3b'
};

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', qty: '42.50', avg: '$178.20', price: '$192.42', pnl: '+$604.35', pnlTone: COLORS.green },
  { symbol: 'BTC', name: 'Bitcoin', qty: '1.24', avg: '$42,100', price: '$64,281', pnl: '+12.4%', pnlTone: COLORS.green },
  { symbol: 'TSLA', name: 'Tesla Motor', qty: '15.00', avg: '$215.10', price: '$184.92', pnl: '-$452.70', pnlTone: COLORS.red }
];

export default function PortfolioScreen() {
  const navigation = useNavigation();
  return (
    <Screen style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topNav}>
          <View style={styles.navLeft}>
            <View style={styles.navBadge}>
              <MaterialIcons name="account-balance-wallet" size={20} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.navTitle}>John's Portfolio</Text>
              <Text style={styles.navSubtitle}>Professional Account</Text>
            </View>
          </View>
          <View style={styles.navRight}>
            <Pressable style={styles.navIcon} onPress={() => navigation.navigate('Analytics')}>
              <MaterialIcons name="analytics" size={18} color="white" />
            </Pressable>
            <Pressable style={styles.navIcon}>
              <MaterialIcons name="search" size={18} color="white" />
            </Pressable>
            <Pressable style={styles.navIcon}>
              <MaterialIcons name="notifications" size={18} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceIcon}>
            <MaterialIcons name="show-chart" size={40} color="rgba(255,255,255,0.2)" />
          </View>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceValue}>$248,192.45</Text>
            <View style={styles.balanceBadge}>
              <Text style={styles.balanceBadgeText}>+4.2%</Text>
            </View>
          </View>
          <View style={styles.sparklineWrap}>
            <Svg width="100%" height="100%" viewBox="0 0 400 100">
              <Defs>
                <SvgGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={COLORS.primary} stopOpacity="0.3" />
                  <Stop offset="1" stopColor={COLORS.primary} stopOpacity="0" />
                </SvgGradient>
              </Defs>
              <Path d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20 L400,100 L0,100 Z" fill="url(#grad)" />
              <Path d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20" fill="none" stroke={COLORS.primary} strokeWidth="3" strokeLinecap="round" />
              <Circle cx="400" cy="20" r="4" fill={COLORS.primary} />
            </Svg>
          </View>
          <View style={styles.rangeRow}>
            {['1D', '1W', '1M', '1Y'].map((label, index) => (
              <View key={label} style={[styles.rangeChip, index === 0 && styles.rangeChipActive]}>
                <Text style={[styles.rangeText, index === 0 && styles.rangeTextActive]}>{label}</Text>
              </View>
            ))}
            <Text style={styles.liveText}>LIVE UPDATES</Text>
          </View>
        </View>

        <View style={styles.allocationSection}>
          <View style={styles.allocationHeader}>
            <Text style={styles.sectionTitle}>Asset Allocation</Text>
            <MaterialIcons name="info" size={18} color={COLORS.muted} />
          </View>
          <View style={styles.allocationCard}>
            <View style={styles.donutWrap}>
              <Svg width="100%" height="100%" viewBox="0 0 36 36">
                <Circle cx="18" cy="18" r="15.9" stroke="#232348" strokeWidth="3.5" fill="transparent" />
                <Circle cx="18" cy="18" r="15.9" stroke={COLORS.primary} strokeWidth="3.5" fill="transparent" strokeDasharray="60 100" strokeLinecap="round" />
                <Circle cx="18" cy="18" r="15.9" stroke={COLORS.green} strokeWidth="3.5" fill="transparent" strokeDasharray="25 100" strokeDashoffset="-60" strokeLinecap="round" />
                <Circle cx="18" cy="18" r="15.9" stroke="#ffb800" strokeWidth="3.5" fill="transparent" strokeDasharray="15 100" strokeDashoffset="-85" strokeLinecap="round" />
              </Svg>
              <View style={styles.donutLabel}>
                <Text style={styles.donutCaption}>Divers.</Text>
                <Text style={styles.donutValue}>High</Text>
              </View>
            </View>
            <View style={styles.legendCol}>
              {[
                { label: 'Stocks', value: '60%', color: COLORS.primary },
                { label: 'Crypto', value: '25%', color: COLORS.green },
                { label: 'Bonds', value: '15%', color: '#ffb800' }
              ].map((item) => (
                <View key={item.label} style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendLabel}>{item.label}</Text>
                  <Text style={styles.legendValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.holdingsHeader}>
          <Text style={styles.sectionTitle}>Current Holdings</Text>
          <Pressable style={styles.viewAll}>
            <Text style={styles.viewAllText}>VIEW ALL</Text>
            <MaterialIcons name="arrow-forward-ios" size={12} color={COLORS.primary} />
          </Pressable>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableLabel}>Asset</Text>
          <Text style={styles.tableLabel}>Qty / Avg</Text>
          <Text style={styles.tableLabel}>Price</Text>
          <Text style={styles.tableLabel}>P&L</Text>
        </View>

        {holdings.map((item) => (
          <View key={item.symbol} style={styles.holdingRow}>
            <View style={styles.assetCell}>
              <View style={styles.assetIcon}>
                <Text style={styles.assetSymbol}>{item.symbol}</Text>
              </View>
              <View>
                <Text style={styles.assetName}>{item.symbol}</Text>
                <Text style={styles.assetSub}>{item.name}</Text>
              </View>
            </View>
            <View style={styles.qtyCell}>
              <Text style={styles.qtyValue}>{item.qty}</Text>
              <Text style={styles.qtySub}>{item.avg}</Text>
            </View>
            <Text style={styles.priceCell}>{item.price}</Text>
            <Text style={[styles.pnlCell, { color: item.pnlTone }]}>{item.pnl}</Text>
          </View>
        ))}
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
    paddingTop: 10,
    paddingBottom: 140
  },
  topNav: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  navBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(17,17,212,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(17,17,212,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navTitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Manrope_600SemiBold'
  },
  navSubtitle: {
    color: COLORS.muted,
    fontSize: 11
  },
  navRight: {
    flexDirection: 'row',
    gap: 8
  },
  navIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  balanceCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'rgba(25,25,51,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20
  },
  balanceIcon: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  balanceLabel: {
    color: COLORS.muted,
    fontSize: 12
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8
  },
  balanceValue: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'Manrope_800ExtraBold'
  },
  balanceBadge: {
    backgroundColor: 'rgba(11,218,104,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999
  },
  balanceBadgeText: {
    color: COLORS.green,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  sparklineWrap: {
    height: 90,
    marginTop: 10
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12
  },
  rangeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.05)'
  },
  rangeChipActive: {
    backgroundColor: COLORS.primary
  },
  rangeText: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  rangeTextActive: {
    color: 'white'
  },
  liveText: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  allocationSection: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  allocationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  allocationCard: {
    flexDirection: 'row',
    gap: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(25,25,51,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  donutWrap: {
    width: 110,
    height: 110
  },
  donutLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  donutCaption: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase'
  },
  donutValue: {
    color: 'white',
    fontFamily: 'Manrope_700Bold'
  },
  legendCol: {
    flex: 1,
    gap: 8
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  legendLabel: {
    color: COLORS.muted,
    fontSize: 12
  },
  legendValue: {
    color: 'white',
    fontFamily: 'Manrope_700Bold'
  },
  holdingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12
  },
  tableLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  holdingRow: {
    marginHorizontal: 16,
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(25,25,51,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  assetCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1
  },
  assetIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  assetSymbol: {
    color: 'white',
    fontFamily: 'Manrope_700Bold',
    fontSize: 10
  },
  assetName: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  assetSub: {
    color: COLORS.muted,
    fontSize: 10
  },
  qtyCell: {
    alignItems: 'center'
  },
  qtyValue: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  qtySub: {
    color: COLORS.muted,
    fontSize: 10
  },
  priceCell: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  pnlCell: {
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 }
  }
});
