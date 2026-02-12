import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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

const defaultTickerItems = [
  { label: 'NIFTY 50', value: '22,038.40', change: '+0.84%', tone: COLORS.success },
  { label: 'SENSEX', value: '72,540.30', change: '+0.78%', tone: COLORS.success },
  { label: 'BANK NIFTY', value: '47,215.10', change: '-0.24%', tone: COLORS.danger },
  { label: 'MCX', value: '8,421.10', change: '+0.62%', tone: COLORS.success }
];

const defaultHeatmapTiles = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', change: '+2.45%', tone: COLORS.success, col: 6, row: 5 },
  { symbol: 'HDFCBANK', name: '', change: '+1.12%', tone: 'rgba(22, 163, 74, 0.6)', col: 6, row: 3 },
  { symbol: 'TCS', name: '', change: '+0.82%', tone: COLORS.success, col: 3, row: 4 },
  { symbol: 'INFY', name: '', change: '-0.45%', tone: 'rgba(239, 68, 68, 0.4)', col: 3, row: 2 },
  { symbol: 'ICICIBANK', name: '', change: '+0.05%', tone: 'rgba(148, 163, 184, 0.35)', col: 6, row: 4 },
  { symbol: 'SBIN', name: '', change: '+1.88%', tone: 'rgba(22, 163, 74, 0.7)', col: 3, row: 3 },
  { symbol: 'LT', name: '', change: '-1.20%', tone: COLORS.danger, col: 3, row: 3 },
  { symbol: 'ITC', name: '', change: '+0.42%', tone: 'rgba(22, 163, 74, 0.4)', col: 3, row: 2 }
];

export default function HeatmapScreen() {
  const [tickerItems, setTickerItems] = useState(defaultTickerItems);
  const [heatmapTiles, setHeatmapTiles] = useState(defaultHeatmapTiles);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = React.useCallback(async () => {
    const [indicesData, heatmapData] = await Promise.all([
      api.getIndices(),
      api.getHeatmap()
    ]);

    if (indicesData.length) {
      setTickerItems(
        indicesData.map((item) => ({
          label: item.label,
          value: Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          change: `${item.change >= 0 ? '+' : ''}${Number(item.changePercent).toFixed(2)}%`,
          tone: item.change >= 0 ? COLORS.success : COLORS.danger
        }))
      );
    }

    if (heatmapData.length) {
      setHeatmapTiles(
        heatmapData.map((tile) => {
          const change = Number(tile.changePercent || 0);
          const isHot = Math.abs(change) >= 1.5;
          return {
            symbol: String(tile.symbol).replace('.BSE', ''),
            name: tile.name || '',
            change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
            tone: change >= 1 ? 'rgba(22, 163, 74, 0.75)' : change <= -1 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(148, 163, 184, 0.35)',
            col: 3,
            row: 4,
            textLight: isHot
          };
        })
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
              <MaterialIcons name="search" size={18} color={COLORS.text} />
            </Pressable>
            <Pressable style={styles.headerIcon}>
              <MaterialIcons name="notifications-none" size={18} color={COLORS.text} />
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
                <Text style={[styles.tileSymbol, tile.textLight && styles.tileSymbolLight]}>
                  {tile.symbol}
                </Text>
              </View>
              <View>
                {tile.name ? <Text style={styles.tileName}>{tile.name}</Text> : null}
                <Text style={[styles.tileChange, tile.textLight && styles.tileSymbolLight]}>
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
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.3)'
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
    color: COLORS.text,
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
    backgroundColor: COLORS.soft,
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
    color: COLORS.text,
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLORS.border
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
    color: '#ffffff'
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
    backgroundColor: COLORS.soft,
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
    color: COLORS.text,
    fontFamily: 'Manrope_800ExtraBold'
  },
  tileSymbolLight: {
    color: 'white'
  },
  tileName: {
    fontSize: 10,
    color: 'rgba(15, 23, 42, 0.6)',
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
    backgroundColor: COLORS.soft,
    marginTop: 10,
    marginBottom: 8
  },
  legendMarker: {
    width: 2,
    height: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
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
