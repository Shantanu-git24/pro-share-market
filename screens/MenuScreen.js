import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';

const FEATURES = [
  {
    title: 'Research Lab',
    subtitle: 'Explore data and test ideas',
    icon: 'biotech'
  },
  {
    title: 'Auto-Track',
    subtitle: 'Follow themes with alerts',
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
    title: 'Report Vault',
    subtitle: 'Export market reports instantly',
    icon: 'receipt-long'
  },
  {
    title: 'Support Desk',
    subtitle: 'Chat with a market specialist',
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
            <MaterialIcons name="arrow-back-ios" size={18} color="#0f172a" />
          </Pressable>
          <Text style={styles.topTitle}>Menu Hub</Text>
          <View style={styles.backButton} />
        </View>

        <LinearGradient colors={['#e0f2fe', '#ffffff']} style={styles.heroCard}>
          <Text style={styles.heroTitle}>Your Command Center</Text>
          <Text style={styles.heroSubtitle}>
            Track markets, monitor funds, and stay informed in real time.
          </Text>
          <View style={styles.heroRow}>
            <View style={styles.heroChip}>
              <MaterialIcons name="bolt" size={14} color="#0f172a" />
              <Text style={styles.heroChipText}>Quick Actions</Text>
            </View>
            <View style={styles.heroChipOutline}>
              <MaterialIcons name="verified" size={14} color="#0ea5e9" />
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
                <MaterialIcons name={item.icon} size={18} color="#0ea5e9" />
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
    backgroundColor: '#f8fafc'
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
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontFamily: 'Manrope_800ExtraBold'
  },
  heroCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 18
  },
  heroTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontFamily: 'Manrope_800ExtraBold'
  },
  heroSubtitle: {
    color: '#475569',
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
    backgroundColor: '#bae6fd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  heroChipText: {
    color: '#0f172a',
    fontSize: 11,
    fontFamily: 'Manrope_700Bold'
  },
  heroChipOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  heroChipOutlineText: {
    color: '#0ea5e9',
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
    color: '#0f172a',
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  sectionTag: {
    color: '#0ea5e9',
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
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  featureText: {
    flex: 1
  },
  featureTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontFamily: 'Manrope_700Bold'
  },
  featureSubtitle: {
    color: '#64748b',
    fontSize: 11,
    marginTop: 4,
    fontFamily: 'Manrope_500Medium'
  }
});
