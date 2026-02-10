import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#0d83f2',
  background: '#101922',
  success: '#00ff88',
  danger: '#ff4d4d',
  muted: '#94a3b8'
};

const tickerItems = [
  { label: 'S&P 500', value: '4,890.97', change: '+1.24%', tone: COLORS.success },
  { label: 'NASDAQ', value: '15,628.95', change: '+0.88%', tone: COLORS.success },
  { label: 'DJIA', value: '38,109.43', change: '-0.12%', tone: COLORS.danger },
  { label: 'BTC', value: '52,431.10', change: '+4.51%', tone: COLORS.success }
];

const heatmapTiles = [
  { symbol: 'AAPL', name: 'Apple Inc.', change: '+2.45%', tone: COLORS.success, col: 6, row: 5 },
  { symbol: 'MSFT', name: '', change: '+1.12%', tone: 'rgba(0,255,136,0.6)', col: 6, row: 3 },
  { symbol: 'NVDA', name: '', change: '+5.82%', tone: COLORS.success, col: 3, row: 4 },
  { symbol: 'AMZN', name: '', change: '-0.45%', tone: 'rgba(255,77,77,0.4)', col: 3, row: 2 },
  { symbol: 'GOOGL', name: '', change: '+0.05%', tone: '#1f2937', col: 6, row: 4 },
  { symbol: 'META', name: '', change: '+1.88%', tone: 'rgba(0,255,136,0.7)', col: 3, row: 3 },
  { symbol: 'TSLA', name: '', change: '-3.20%', tone: COLORS.danger, col: 3, row: 3 },
  { symbol: 'BRK.B', name: '', change: '-1.15%', tone: 'rgba(255,77,77,0.6)', col: 6, row: 3 },
  { symbol: 'AVGO', name: '', change: '+0.42%', tone: 'rgba(0,255,136,0.4)', col: 3, row: 2 },
  { symbol: 'JPM', name: '', change: '+2.10%', tone: 'rgba(0,255,136,0.8)', col: 3, row: 2 }
];

export default function HeatmapScreen() {
  return (
    <Screen style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.headerLabel}>Market Analysis</Text>
              <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Heatmap</Text>
                <View style={styles.liveDot} />
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Pressable style={styles.headerIcon}>
              <MaterialIcons name="search" size={18} color="white" />
            </Pressable>
            <Pressable style={styles.headerIcon}>
              <MaterialIcons name="notifications-none" size={18} color="white" />
            </Pressable>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tickerRow}>
          {tickerItems.map((item) => (
            <View key={item.label} style={styles.tickerItem}>
              <Text style={styles.tickerLabel}>{item.label}</Text>
              <Text style={styles.tickerValue}>{item.value}</Text>
              <Text style={[styles.tickerChange, { color: item.tone }]}>{item.change}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sectorRow}>
          {['All Sectors', 'Technology', 'Finance', 'Healthcare', 'Energy'].map((label, index) => (
            <View key={label} style={[styles.sectorChip, index === 0 && styles.sectorChipActive]}>
              <Text style={[styles.sectorText, index === 0 && styles.sectorTextActive]}>{label}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.timeRow}>
          <View style={styles.timeToggle}>
            {['1D', '1W', '1M', 'YTD', '1Y'].map((label, index) => (
              <View key={label} style={[styles.timeChip, index === 0 && styles.timeChipActive]}>
                <Text style={[styles.timeText, index === 0 && styles.timeTextActive]}>{label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.sortRow}>
            <MaterialIcons name="filter-list" size={14} color={COLORS.muted} />
            <Text style={styles.sortText}>Sort: Market Cap</Text>
          </View>
        </View>

        <View style={styles.heatmap}>
          {heatmapTiles.map((tile, index) => (
            <View
              key={`${tile.symbol}-${index}`}
              style={[
                styles.heatTile,
                {
                  width: `${(tile.col / 12) * 100}%`,
                  height: tile.row * 18,
                  backgroundColor: tile.tone
                }
              ]}
            >
              <View style={styles.tileHeader}>
                <Text style={[styles.tileSymbol, tile.tone === COLORS.danger && styles.tileSymbolLight]}>
                  {tile.symbol}
                </Text>
              </View>
              <View>
                {tile.name ? <Text style={styles.tileName}>{tile.name}</Text> : null}
                <Text style={[styles.tileChange, tile.tone === COLORS.danger && styles.tileSymbolLight]}>
                  {tile.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendHeader}>
            <Text style={styles.legendLabel}>Performance Scale</Text>
            <Text style={styles.legendLabel}>Vol: High</Text>
          </View>
          <View style={styles.legendBar}>
            <View style={styles.legendMarker} />
          </View>
          <View style={styles.legendFooter}>
            <Text style={[styles.legendValue, { color: COLORS.danger }]}>-3%</Text>
            <Text style={styles.legendValue}>0%</Text>
            <Text style={[styles.legendValue, { color: COLORS.success }]}>+3%</Text>
          </View>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(13,131,242,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(13,131,242,0.3)'
  },
  headerLabel: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_600SemiBold'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold'
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tickerRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  tickerLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  tickerValue: {
    color: 'white',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  tickerChange: {
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  sectorRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8
  },
  sectorChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  sectorChipActive: {
    backgroundColor: COLORS.primary
  },
  sectorText: {
    color: COLORS.muted,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  sectorTextActive: {
    color: 'white'
  },
  timeRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 4,
    gap: 6
  },
  timeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  timeChipActive: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  timeText: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  timeTextActive: {
    color: 'white'
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  sortText: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase'
  },
  heatmap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 6
  },
  heatTile: {
    borderRadius: 12,
    padding: 10,
    justifyContent: 'space-between'
  },
  tileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tileSymbol: {
    color: '#101922',
    fontFamily: 'Manrope_800ExtraBold'
  },
  tileSymbolLight: {
    color: 'white'
  },
  tileName: {
    fontSize: 10,
    color: 'rgba(16,25,34,0.6)',
    fontFamily: 'Manrope_700Bold',
    textTransform: 'uppercase'
  },
  tileChange: {
    fontFamily: 'Manrope_800ExtraBold'
  },
  legend: {
    paddingHorizontal: 16,
    paddingTop: 20
  },
  legendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  legendLabel: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  legendBar: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#1f2937',
    marginTop: 10,
    marginBottom: 8
  },
  legendMarker: {
    width: 2,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginLeft: '50%'
  },
  legendFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  legendValue: {
    fontSize: 10,
    fontFamily: 'Manrope_800ExtraBold',
    color: COLORS.muted
  }
});
