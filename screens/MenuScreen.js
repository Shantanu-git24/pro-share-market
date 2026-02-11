import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';

const FEATURES = [
  {
    title: 'Strategy Lab',
    subtitle: 'Build and backtest new ideas',
    icon: 'biotech'
  },
  {
    title: 'Auto-Invest',
    subtitle: 'Set recurring buys with rules',
    icon: 'autorenew'
  },
  {
    title: 'Risk Scanner',
    subtitle: 'Flag volatility and exposure',
    icon: 'warning'
  },
  {
    title: 'Market Sentiment',
    subtitle: 'Track news pulse and flow',
    icon: 'insights'
  },
  {
    title: 'Tax Vault',
    subtitle: 'Export reports instantly',
    icon: 'receipt-long'
  },
  {
    title: 'Support Desk',
    subtitle: 'Chat with a trading specialist',
    icon: 'support-agent'
  }
];

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <Screen style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={18} color="white" />
          </Pressable>
          <Text style={styles.topTitle}>Menu Hub</Text>
          <View style={styles.backButton} />
        </View>

        <LinearGradient colors={['#1111d4', '#0b0b14']} style={styles.heroCard}>
          <Text style={styles.heroTitle}>Your Command Center</Text>
          <Text style={styles.heroSubtitle}>
            Launch premium tools, automate trades, and keep risk under control.
          </Text>
          <View style={styles.heroRow}>
            <View style={styles.heroChip}>
              <MaterialIcons name="bolt" size={14} color="#0b0b14" />
              <Text style={styles.heroChipText}>Quick Actions</Text>
            </View>
            <View style={styles.heroChipOutline}>
              <MaterialIcons name="verified" size={14} color="#8ba3ff" />
              <Text style={styles.heroChipOutlineText}>Pro Tools</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Tools</Text>
          <Text style={styles.sectionTag}>6 modules</Text>
        </View>

        <View style={styles.featureList}>
          {FEATURES.map((item) => (
            <Pressable key={item.title} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <MaterialIcons name={item.icon} size={18} color="#8ba3ff" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#64748b" />
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
    backgroundColor: '#0a0a14'
  },
  scroll: {
    paddingBottom: 120
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold'
  },
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 18
  },
  heroTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Manrope_800ExtraBold'
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
    fontFamily: 'Manrope_500Medium'
  },
  heroRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12
  },
  heroChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#8ba3ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  heroChipText: {
    color: '#0b0b14',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  heroChipOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(139,163,255,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  heroChipOutlineText: {
    color: '#8ba3ff',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  sectionTag: {
    color: '#8ba3ff',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  featureList: {
    paddingHorizontal: 16,
    gap: 12
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(139,163,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  featureText: {
    flex: 1
  },
  featureTitle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Manrope_700Bold'
  },
  featureSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'Manrope_500Medium'
  }
});
