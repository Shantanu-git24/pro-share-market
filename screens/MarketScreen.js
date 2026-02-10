import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { api } from '../api';
import { styles, COLORS, cardWidth, spacing } from '../styles';
import Sparkline from '../components/Sparkline';

const MarketCard = ({ stock, onPress }) => (
  <Pressable style={styles.marketCard} onPress={onPress}>
    <Text style={styles.marketSymbol}>{stock.symbol}</Text>
    <Text style={styles.marketName}>{stock.name}</Text>
    <View style={styles.marketChart}>
      <Sparkline
        data={stock.sparkline}
        width={cardWidth - spacing.lg}
        height={40}
        color={stock.changePercent >= 0 ? COLORS.accent : COLORS.danger}
      />
    </View>
    <View style={styles.marketFooter}>
      <Text style={styles.marketPrice}>${stock.price}</Text>
      <View style={[styles.marketBadge, stock.changePercent >= 0 ? styles.badgeAccent : styles.badgeDanger]}>
        <Text style={[styles.marketBadgeText, stock.changePercent >= 0 ? styles.textAccent : styles.textDanger]}>
          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
        </Text>
      </View>
    </View>
  </Pressable>
);

export default function MarketScreen({ onSelectStock }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    api.getStocks().then(setStocks);
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.pageTitle}>Market Overview</Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        numColumns={2}
        columnWrapperStyle={styles.marketRow}
        contentContainerStyle={styles.marketList}
        renderItem={({ item }) => <MarketCard stock={item} onPress={() => onSelectStock(item)} />}
        ListFooterComponent={
          <View style={styles.addCard}>
            <Plus size={28} color={COLORS.muted} />
            <Text style={styles.addCardText}>Add Asset</Text>
          </View>
        }
      />
    </View>
  );
}
