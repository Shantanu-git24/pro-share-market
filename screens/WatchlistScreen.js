import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#339cff',
  background: '#0a0c10',
  success: '#39FF14',
  danger: '#FF3131',
  muted: '#9ca3af'
};

const watchlist = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$182.63', change: '+1.24%', tone: COLORS.success, spark: 'M0,25 Q10,15 20,20 T40,10 T60,22 T80,5 T100,12' },
  { symbol: 'TSLA', name: 'Tesla Corp.', price: '$214.50', change: '-3.15%', tone: COLORS.danger, spark: 'M0,5 Q20,25 40,20 T70,28 T100,25' },
  { symbol: 'NVDA', name: 'Nvidia', price: '$875.20', change: '+8.42%', tone: COLORS.success, spark: 'M0,28 Q20,25 40,15 T60,10 T80,5 T100,2', highlight: true },
  { symbol: 'MSFT', name: 'Microsoft', price: '$402.12', change: '+0.45%', tone: COLORS.success, spark: 'M0,15 Q30,12 50,15 T100,14' },
  { symbol: 'AMZN', name: 'Amazon Inc.', price: '$174.45', change: '+1.88%', tone: COLORS.success, spark: 'M0,20 Q20,22 40,18 T70,10 T100,12' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$142.10', change: '-0.92%', tone: COLORS.danger, spark: 'M0,10 Q20,12 40,18 T70,25 T100,28' }
];

export default function WatchlistScreen() {
  const navigation = useNavigation();
  return (
    <Screen style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Watchlist</Text>
            <Text style={styles.headerSubtitle}>Updated 2 mins ago</Text>
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
          {watchlist.map((item) => (
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
              <Svg width="100%" height="50" viewBox="0 0 100 30" style={styles.sparkline}>
                <Path d={item.spark} stroke={item.tone} strokeWidth="2" fill="none" strokeLinecap="round" />
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
    color: 'white',
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
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(51,156,255,0.3)'
  },
  tabRow: {
    paddingVertical: 16,
    gap: 10
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
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
    color: 'white'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  cardHighlight: {
    borderColor: 'rgba(51,156,255,0.3)',
    backgroundColor: 'rgba(51,156,255,0.05)'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  cardSymbol: {
    color: 'white',
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
    marginVertical: 8
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardPrice: {
    color: 'white',
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
    borderColor: 'rgba(255,255,255,0.1)',
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
