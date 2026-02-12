import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Pressable, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api';

const COLORS = {
  primary: '#0ea5e9',
  background: '#f8fafc',
  muted: '#64748b',
  bullish: '#16a34a',
  bearish: '#ef4444',
  text: '#0f172a',
  card: '#ffffff',
  border: '#e2e8f0',
  soft: '#f1f5f9'
};

const defaultStories = [
  { title: 'CPI Data', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC40nHZ7yYVrc0MHtLOVVfJLSwDHXqdlrLXY0HhGfJOZs9T7FeWRwIVfY3jtx_-tqW-jF3rmAahLTaB7iMAUtU63CKgk4TSvmK0zbk4hrUmznqyZfNIS4G77kuGoGHL65v6gX_VVG_GJ5f2eNUz0pxmkfhs0wgOZXABI3R18IeAC9Y_HoHbthPAuzL9CCaRbH5zyzK_PrX7rHZBhbgWGfXLPDC4c2yH2wdDk4yeHWhCEq0xUyPcbyZk0oQtk_G5KiDLUi1Bggdfri8' },
  { title: 'Fed Meeting', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY3PqTQ42GYMEg88kVh37-Os0UmVi5E42f_EUB55uLhj6pDEPosAKGa8Y8xBTjgWyC26obpMs88X6qcuOEGVI9cjrHzJSeNW095yBOMPKPNIItisnUULDvHyqzOp-z4xYQAksfCsiyvlaeRNgTR9hCMO8DAmOpRWLGvNwG2wpGnZbeor2-USgJXIcV-C8zkhM9Zoa_lwIDg2gEmVQk1rvlqOF5zc3QYg3JhNf8tVTrpFjwCdEkVw5juqhAZIMRqwkv8tX3vzaP8kE' },
  { title: 'NVDA Split', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtiRyfkt3BTr2F2XcKLknZRKPy575bacVZOn803klWV9ulNWcwLZBIbf4gjbikKvl9WmwFLI5X1VxRLBNfZchC0srMTxBqPPGgpd7zz-3cCzrWIYmJuhLxHO4OSf2iwKQJ5hrJrGY6SF4NRojrKtAPoq8RIiDiC77g0LOWXeYcjgqM8mZBGTDd-jQd3mbkykbND92wmRdS11jKTPuvArHXQCaVeHpEXpiaa2NTrsiovkGZfYYuP7U-VBajv32G7EjWt_roO0CjmO4' },
  { title: 'BTC ETF', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc68nmvAWWJz89d5uld9cB7JpLX5jNyPG3xUFsjlFj5eImCQ_AAuSV4an3MK0IhOjFlNcG1zfXfHND-lm4ZEnKmbB_BxBGI-JfmbWzhzHkbfN0NXz-RRO7SbfZrykO2s6qm2WglAMPLtORn2ASu1vXCw3a4FkUeaf0qSrixVpkmrUqfC2uxlocEjPL9GBV3Q0mvI_YYzZGOtaQzCRgZ24unHHSVlQIGT6B6oQjU8UQm2RxTAGKYNEPwSyiSZ_amIhhy7YAVTHCd7k' },
  { title: 'Brent Crude', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtHEGtvWXZq5E-2RNTJorCJIIiadB0R1qEvfZAzoJ1w59VTJU0ZdYzXcp_J4l0-2-KMbwj1pQvFSqA56u5QGruzQxElFdYIsSSRir4Y0zVZ6fflMD3iqYJbZFs4KABSNfGXZzpzg0nKN_ROK3NJXgPUg3Z9uNPthxdd4qE7ITDpQ8yVvkFG7G8x8UbQtGDTOdDPwWg05r8FuPrRYSy2eHzqO1FmbXKDX-YLsOtdiklyzvPcFgnqcn4rf8vFm2J0E81jQPffKOzGU' }
];

const defaultTrendingTickers = [
  { symbol: '$BTC', change: '+4.2%', tone: COLORS.bullish },
  { symbol: '$AAPL', change: '-1.2%', tone: COLORS.bearish },
  { symbol: '$TSLA', change: '+0.8%', tone: COLORS.bullish },
  { symbol: '$ETH', change: '+2.1%', tone: COLORS.bullish }
];


const defaultTrendingMentions = [
  { rank: '01', symbol: '$NVDA', mentions: '2.4k Mentions/hr', change: '+5.42%', bar: 0.75, tone: COLORS.bullish },
  { rank: '02', symbol: '$AAPL', mentions: '1.8k Mentions/hr', change: '-0.85%', bar: 0.4, tone: COLORS.bearish }
];

const categoryTabs = [
  { label: 'All News', key: 'all' },
  { label: '#Crypto', key: 'crypto' },
  { label: '#Tech', key: 'tech' },
  { label: '#Macro', key: 'macro' },
  { label: '#Forex', key: 'forex' }
];

const matchesCategory = (item, key) => {
  if (key === 'all') {
    return true;
  }

  const text = `${item.category || ''} ${item.title || ''}`.toLowerCase();
  if (key === 'crypto') {
    return text.includes('crypto') || text.includes('bitcoin') || text.includes('btc') || text.includes('ethereum');
  }
  if (key === 'tech') {
    return text.includes('tech') || text.includes('it') || text.includes('ai') || text.includes('software');
  }
  if (key === 'macro') {
    return text.includes('macro') || text.includes('rates') || text.includes('inflation') || text.includes('rbi');
  }
  if (key === 'forex') {
    return text.includes('forex') || text.includes('usd') || text.includes('inr') || text.includes('currency');
  }

  return true;
};

export default function NewsScreen() {
  const [stories] = useState(defaultStories);
  const [trendingTickers, setTrendingTickers] = useState(defaultTrendingTickers);
  const [newsCards, setNewsCards] = useState([]);
  const [trendingMentions, setTrendingMentions] = useState(defaultTrendingMentions);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const loadData = React.useCallback(async () => {
    const [newsData, stocksData] = await Promise.all([
      api.getNews(),
      api.getStocks()
    ]);

    if (newsData.length) {
      setNewsCards(
        newsData.map((item, index) => ({
          id: item.id || `news-${index}`,
          title: item.title,
          category: item.category || 'Market',
          time: item.time,
          sentiment: item.sentiment || 'bullish',
          image: item.imageUrl,
          source: item.source
        }))
      );
    } else {
      setNewsCards([]);
    }

    if (stocksData.length) {
      const tickers = stocksData.slice(0, 4).map((stock) => ({
        symbol: stock.symbol.replace('.BSE', ''),
        change: `${stock.changePercent >= 0 ? '+' : ''}${Number(stock.changePercent).toFixed(2)}%`,
        tone: stock.changePercent >= 0 ? COLORS.bullish : COLORS.bearish
      }));
      setTrendingTickers(tickers);

      const mentions = stocksData.slice(0, 2).map((stock, index) => ({
        rank: `0${index + 1}`,
        symbol: stock.symbol.replace('.BSE', ''),
        mentions: `${Math.round(Math.abs(stock.changePercent) * 350 + 600)} Mentions/hr`,
        change: `${stock.changePercent >= 0 ? '+' : ''}${Number(stock.changePercent).toFixed(2)}%`,
        bar: Math.min(1, Math.abs(stock.changePercent) / 6),
        tone: stock.changePercent >= 0 ? COLORS.bullish : COLORS.bearish
      }));
      setTrendingMentions(mentions);
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

  const filteredNews = newsCards.filter((item) => matchesCategory(item, activeCategory));

  return (
    <Screen style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
      <View style={styles.nav}>
        <View style={styles.navLeft}>
          <View style={styles.navBadge}>
            <MaterialIcons name="analytics" size={18} color={COLORS.primary} />
          </View>
          <View>
            <Text style={styles.navTitle}>TERMINAL</Text>
            <Text style={styles.navSubtitle}>News & Sentiment</Text>
          </View>
        </View>
        <View style={styles.navRight}>
          <Pressable style={styles.navIcon}>
            <MaterialIcons name="search" size={18} color={COLORS.muted} />
          </Pressable>
          <View style={styles.navAvatar} />
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionLabel}>Market Pulse</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storyRow}>
        {stories.map((story) => (
          <View key={story.title} style={styles.storyCard}>
            <Image source={{ uri: story.image }} style={styles.storyImage} />
            <View style={styles.storyOverlay} />
            <Text style={styles.storyTitle}>{story.title}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tickerChips}>
        {trendingTickers.map((ticker) => (
          <View key={ticker.symbol} style={styles.tickerChip}>
            <Text style={styles.tickerSymbol}>{ticker.symbol}</Text>
            <Text style={[styles.tickerChange, { color: ticker.tone }]}>{ticker.change}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {categoryTabs.map((category) => {
          const isActive = category.key === activeCategory;
          return (
            <Pressable
              key={category.key}
              style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              onPress={() => setActiveCategory(category.key)}
            >
              <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{category.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.newsList}>
        {filteredNews.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No news available</Text>
            <Text style={styles.emptyBody}>Connect the news API or refresh to pull the latest feed.</Text>
          </View>
        ) : filteredNews.map((item) => (
          <View key={item.id} style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={[styles.sentimentTag, item.sentiment === 'bullish' ? styles.tagBullish : styles.tagBearish]}>
                <MaterialIcons name={item.sentiment === 'bullish' ? 'trending-up' : 'trending-down'} size={12} color="#ffffff" />
              <Text style={styles.sentimentText}>{item.sentiment.toUpperCase()}</Text>
            </View>
            <View style={styles.newsBody}>
              <View style={styles.newsMeta}>
                <Text style={styles.newsCategory}>{item.category}</Text>
                <Text style={styles.newsTime}>• {item.time}</Text>
              </View>
              <Text style={styles.newsHeadline}>{item.title}</Text>
              <View style={styles.newsFooter}>
                <View style={styles.newsSource}>
                  <View style={styles.sourceDot} />
                  <Text style={styles.sourceText}>{item.source}</Text>
                </View>
                <MaterialIcons name="bookmark" size={18} color={COLORS.muted} />
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.trendingTitle}>Top Trending Mentions</Text>
      <View style={styles.trendingList}>
        {trendingMentions.map((item) => (
          <View key={item.rank} style={styles.trendingCard}>
            <View style={styles.trendingLeft}>
              <Text style={styles.trendingRank}>{item.rank}</Text>
              <View>
                <Text style={styles.trendingSymbol}>{item.symbol}</Text>
                <Text style={styles.trendingMentions}>{item.mentions}</Text>
              </View>
            </View>
            <View style={styles.trendingRight}>
              <Text style={[styles.trendingChange, { color: item.tone }]}>{item.change}</Text>
              <View style={styles.trendingBar}>
                <View style={[styles.trendingFill, { width: `${item.bar * 100}%` }]} />
              </View>
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
    paddingBottom: 120
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
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
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Manrope_800ExtraBold'
  },
  navSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  navIcon: {
    padding: 6,
    borderRadius: 18,
    backgroundColor: COLORS.soft
  },
  navAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.soft,
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.3)'
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  sectionLabel: {
    color: COLORS.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.bullish
  },
  liveText: {
    color: COLORS.bullish,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  storyRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12
  },
  storyCard: {
    width: 90,
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  storyImage: {
    width: '100%',
    height: '100%'
  },
  storyOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  storyTitle: {
    position: 'absolute',
    bottom: 8,
    left: 6,
    right: 6,
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Manrope_600SemiBold'
  },
  tickerChips: {
    paddingHorizontal: 16,
    gap: 8
  },
  tickerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  tickerSymbol: {
    color: COLORS.text,
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  tickerChange: {
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  categoryRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary
  },
  categoryText: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'Manrope_600SemiBold'
  },
  categoryTextActive: {
    color: 'white'
  },
  newsList: {
    paddingHorizontal: 16,
    gap: 16
  },
  emptyState: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Manrope_700Bold'
  },
  emptyBody: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 6
  },
  newsCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  newsImage: {
    width: '100%',
    height: 180
  },
  sentimentTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  tagBullish: {
    backgroundColor: COLORS.bullish
  },
  tagBearish: {
    backgroundColor: COLORS.bearish
  },
  sentimentText: {
    color: 'white',
    fontSize: 9,
    fontFamily: 'Manrope_700Bold'
  },
  newsBody: {
    padding: 14,
    backgroundColor: COLORS.card
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  newsCategory: {
    color: COLORS.primary,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  newsTime: {
    color: COLORS.muted,
    fontSize: 10
  },
  newsHeadline: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    marginTop: 6
  },
  newsFooter: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  newsSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sourceDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.soft
  },
  sourceText: {
    color: COLORS.text,
    fontFamily: 'Manrope_600SemiBold'
  },
  trendingTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold',
    paddingHorizontal: 16,
    marginTop: 16
  },
  trendingList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12
  },
  trendingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  trendingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  trendingRank: {
    color: COLORS.muted,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  trendingSymbol: {
    color: COLORS.text,
    fontFamily: 'Manrope_700Bold'
  },
  trendingMentions: {
    color: COLORS.muted,
    fontSize: 10
  },
  trendingRight: {
    alignItems: 'flex-end',
    gap: 6
  },
  trendingChange: {
    fontSize: 12,
    fontFamily: 'Manrope_700Bold'
  },
  trendingBar: {
    width: 60,
    height: 6,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    borderRadius: 999
  },
  trendingFill: {
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 999
  }
});
