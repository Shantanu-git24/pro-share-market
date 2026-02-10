import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#1111d4',
  background: '#101022',
  muted: '#9292c9',
  bullish: '#10b981',
  bearish: '#ef4444'
};

const stories = [
  { title: 'CPI Data', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC40nHZ7yYVrc0MHtLOVVfJLSwDHXqdlrLXY0HhGfJOZs9T7FeWRwIVfY3jtx_-tqW-jF3rmAahLTaB7iMAUtU63CKgk4TSvmK0zbk4hrUmznqyZfNIS4G77kuGoGHL65v6gX_VVG_GJ5f2eNUz0pxmkfhs0wgOZXABI3R18IeAC9Y_HoHbthPAuzL9CCaRbH5zyzK_PrX7rHZBhbgWGfXLPDC4c2yH2wdDk4yeHWhCEq0xUyPcbyZk0oQtk_G5KiDLUi1Bggdfri8' },
  { title: 'Fed Meeting', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY3PqTQ42GYMEg88kVh37-Os0UmVi5E42f_EUB55uLhj6pDEPosAKGa8Y8xBTjgWyC26obpMs88X6qcuOEGVI9cjrHzJSeNW095yBOMPKPNIItisnUULDvHyqzOp-z4xYQAksfCsiyvlaeRNgTR9hCMO8DAmOpRWLGvNwG2wpGnZbeor2-USgJXIcV-C8zkhM9Zoa_lwIDg2gEmVQk1rvlqOF5zc3QYg3JhNf8tVTrpFjwCdEkVw5juqhAZIMRqwkv8tX3vzaP8kE' },
  { title: 'NVDA Split', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtiRyfkt3BTr2F2XcKLknZRKPy575bacVZOn803klWV9ulNWcwLZBIbf4gjbikKvl9WmwFLI5X1VxRLBNfZchC0srMTxBqPPGgpd7zz-3cCzrWIYmJuhLxHO4OSf2iwKQJ5hrJrGY6SF4NRojrKtAPoq8RIiDiC77g0LOWXeYcjgqM8mZBGTDd-jQd3mbkykbND92wmRdS11jKTPuvArHXQCaVeHpEXpiaa2NTrsiovkGZfYYuP7U-VBajv32G7EjWt_roO0CjmO4' },
  { title: 'BTC ETF', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc68nmvAWWJz89d5uld9cB7JpLX5jNyPG3xUFsjlFj5eImCQ_AAuSV4an3MK0IhOjFlNcG1zfXfHND-lm4ZEnKmbB_BxBGI-JfmbWzhzHkbfN0NXz-RRO7SbfZrykO2s6qm2WglAMPLtORn2ASu1vXCw3a4FkUeaf0qSrixVpkmrUqfC2uxlocEjPL9GBV3Q0mvI_YYzZGOtaQzCRgZ24unHHSVlQIGT6B6oQjU8UQm2RxTAGKYNEPwSyiSZ_amIhhy7YAVTHCd7k' },
  { title: 'Brent Crude', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtHEGtvWXZq5E-2RNTJorCJIIiadB0R1qEvfZAzoJ1w59VTJU0ZdYzXcp_J4l0-2-KMbwj1pQvFSqA56u5QGruzQxElFdYIsSSRir4Y0zVZ6fflMD3iqYJbZFs4KABSNfGXZzpzg0nKN_ROK3NJXgPUg3Z9uNPthxdd4qE7ITDpQ8yVvkFG7G8x8UbQtGDTOdDPwWg05r8FuPrRYSy2eHzqO1FmbXKDX-YLsOtdiklyzvPcFgnqcn4rf8vFm2J0E81jQPffKOzGU' }
];

const trendingTickers = [
  { symbol: '$BTC', change: '+4.2%', tone: COLORS.bullish },
  { symbol: '$AAPL', change: '-1.2%', tone: COLORS.bearish },
  { symbol: '$TSLA', change: '+0.8%', tone: COLORS.bullish },
  { symbol: '$ETH', change: '+2.1%', tone: COLORS.bullish }
];

const newsCards = [
  {
    id: 1,
    title: 'US Labor Market Shows Resilience with Unexpected Job Gains',
    category: 'Macro Analysis',
    time: '12m ago',
    sentiment: 'bullish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaqTDPHXhYYWbMUx0KBA6WBpOKYs1IDhNg1MfmkDtP1ia_yzbEloLsgBGvhlDCqroD5RDjvRL78mL94SRm1gpMj2bdb1jyMjY-7jhqCE6ZBGaH9JJ5PqP5vemBjoySbwjZOXmEviBo962BFGKsR_h5KSz6RxKGCnBoNBvNLyWqertOEW14AKKDycXD0lUihZpOnkwHPKrEcMtAiPcYOIvBZxJHWQXPkl3aGb5k5I8VkBdf9-i1KYurp5H1WuPRmr0nwKcIUBuWdK0',
    source: 'Bloomberg Finance'
  },
  {
    id: 2,
    title: 'Regulatory Scrutiny Intensifies for Major Offshore Exchanges',
    category: 'Crypto News',
    time: '45m ago',
    sentiment: 'bearish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnOzIbb8KsZGYPaz77bGuv75yHTJBdC8lte_jZ8gaCF58yJ71EK25eKXTqhlc3dnvWgOqg9zR7jEwV0C_fuXCsNBmdyebiE5cUfF8JRYzvTxK_fsQs3RjI5di4XB_-zv7vGiCMfE4nfF9H1AZ9mbUWdsVxRMokuLrxGKVkpSFtFA0xZxn_gRlRmoAcF_27nlQDyTygg2aFYLv6d7ubuiNWc_PV2oUyTMh53M-7k8uw5DqIRDqQQP5-yw7RSPJOM9_A3mMb3Pu-sWE',
    source: 'CoinDesk'
  }
];

const trendingMentions = [
  { rank: '01', symbol: '$NVDA', mentions: '2.4k Mentions/hr', change: '+5.42%', bar: 0.75, tone: COLORS.bullish },
  { rank: '02', symbol: '$AAPL', mentions: '1.8k Mentions/hr', change: '-0.85%', bar: 0.4, tone: COLORS.bearish }
];

export default function NewsScreen() {
  return (
    <Screen style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.nav}>
        <View style={styles.navLeft}>
          <View style={styles.navBadge}>
            <MaterialIcons name="analytics" size={18} color="white" />
          </View>
          <View>
            <Text style={styles.navTitle}>TERMINAL</Text>
            <Text style={styles.navSubtitle}>News & Sentiment</Text>
          </View>
        </View>
        <View style={styles.navRight}>
          <Pressable style={styles.navIcon}>
            <MaterialIcons name="search" size={18} color="#94a3b8" />
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
        {['All News', '#Crypto', '#Tech', '#Macro', '#Forex'].map((category, index) => (
          <View key={category} style={[styles.categoryChip, index === 0 && styles.categoryChipActive]}>
            <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>{category}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.newsList}>
        {newsCards.map((item) => (
          <View key={item.id} style={styles.newsCard}>
            <Image source={{ uri: item.image }} style={styles.newsImage} />
            <View style={[styles.sentimentTag, item.sentiment === 'bullish' ? styles.tagBullish : styles.tagBearish]}>
              <MaterialIcons name={item.sentiment === 'bullish' ? 'trending-up' : 'trending-down'} size={12} color="white" />
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
                <MaterialIcons name="bookmark" size={18} color="#94a3b8" />
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
    borderBottomColor: 'rgba(255,255,255,0.08)'
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
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_800ExtraBold'
  },
  navSubtitle: {
    color: COLORS.primary,
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
    borderRadius: 18
  },
  navAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#475569',
    borderWidth: 2,
    borderColor: 'rgba(17,17,212,0.4)'
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  sectionLabel: {
    color: '#94a3b8',
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
    borderColor: 'rgba(255,255,255,0.1)'
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  tickerSymbol: {
    color: 'white',
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary
  },
  categoryText: {
    color: '#cbd5f5',
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
  newsCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
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
    backgroundColor: 'rgba(255,255,255,0.04)'
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
    color: '#94a3b8',
    fontSize: 10
  },
  newsHeadline: {
    color: 'white',
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
    backgroundColor: '#475569'
  },
  sourceText: {
    color: 'white',
    fontFamily: 'Manrope_600SemiBold'
  },
  trendingTitle: {
    color: 'white',
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
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  trendingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  trendingRank: {
    color: '#94a3b8',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  trendingSymbol: {
    color: 'white',
    fontFamily: 'Manrope_700Bold'
  },
  trendingMentions: {
    color: '#94a3b8',
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
    backgroundColor: 'rgba(17,17,212,0.1)',
    borderRadius: 999
  },
  trendingFill: {
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 999
  }
});
