import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Pressable, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';

const COLORS = {
  primary: '#0ea5e9',
  background: '#f8fafc',
  card: '#ffffff',
  muted: '#64748b',
  text: '#0f172a',
  border: '#e2e8f0',
  soft: '#f1f5f9'
};

export default function ProfileScreen() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [reports, setReports] = useState(true);

  return (
    <Screen style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <Pressable style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color={COLORS.text} />
        </Pressable>
        <Text style={styles.topTitle}>Profile & Settings</Text>
        <Pressable style={styles.settingsButton}>
          <MaterialIcons name="settings" size={20} color={COLORS.text} />
        </Pressable>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsI6ydG8bVeIr90ZjZ1D4otg7xz3HSr2AcWd7wOWHwHHOKq825Aqw8CeteA7vWw23C48lmWpkU1NMt5TbAEfD67mqAd3IWwMsvVezJvcODkhaWHtDgWGt5iVftuQKvLArkxK3_BVLppzxarJC7yg-HIrYeu-2PBGzSaXigwN9ZLfGA9eRDu_eTs0zKcEbndTqUJBsbq6vuT35y-NTDds7ZXBsy5HCmDw-uP0Qe95S4QrRo9eCpL-l58VsWgAeiVe4W9czvVygd-JY' }}
            style={styles.avatar}
          />
          <View style={styles.verifiedBadge}>
            <MaterialIcons name="verified" size={14} color="black" />
          </View>
        </View>
        <Text style={styles.profileName}>Alex Stratos</Text>
        <View style={styles.profileMeta}>
          <Text style={styles.profileRole}>Market Analyst</Text>
          <Text style={styles.profileDot}>•</Text>
          <Text style={styles.profileStatus}>Verified Account</Text>
        </View>
        <Text style={styles.profileUid}>UID: 88291044</Text>
        <Pressable style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Account Level</Text>
          <View style={styles.statValueRow}>
            <Text style={styles.statValue}>Tier 3</Text>
            <Text style={styles.statBadge}>+PRO</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Security Score</Text>
          <View style={styles.statValueRow}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statBadge}>EXCELLENT</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeading}>Security Overview</Text>
      <View style={styles.listCard}>
        <View style={styles.listRow}>
          <View style={styles.listLeft}>
            <View style={styles.listIcon}>
              <MaterialIcons name="shield" size={18} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.listTitle}>Two-Factor Auth</Text>
              <Text style={styles.listSubtitle}>Google Authenticator Active</Text>
            </View>
          </View>
          <Switch value={twoFactor} onValueChange={setTwoFactor} thumbColor="#ffffff" trackColor={{ true: COLORS.primary, false: COLORS.border }} />
        </View>
        <View style={styles.listRow}>
          <View style={styles.listLeft}>
            <View style={styles.listIcon}>
              <MaterialIcons name="fingerprint" size={18} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.listTitle}>Biometric Login</Text>
              <Text style={styles.listSubtitle}>Face ID Enabled</Text>
            </View>
          </View>
          <Switch value={biometric} onValueChange={setBiometric} thumbColor="#ffffff" trackColor={{ true: COLORS.primary, false: COLORS.border }} />
        </View>
      </View>

      <Text style={styles.sectionHeading}>Notifications</Text>
      <View style={styles.listCard}>
        <View style={styles.listRow}>
          <View style={styles.listLeft}>
            <View style={styles.listIcon}>
              <MaterialIcons name="notifications-active" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.listTitle}>Price Volatility Alerts</Text>
          </View>
          <Switch value={alerts} onValueChange={setAlerts} thumbColor="#ffffff" trackColor={{ true: COLORS.primary, false: COLORS.border }} />
        </View>
        <View style={styles.listRow}>
          <View style={styles.listLeft}>
            <View style={styles.listIcon}>
              <MaterialIcons name="receipt-long" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.listTitle}>Market Reports</Text>
          </View>
          <Switch value={reports} onValueChange={setReports} thumbColor="#ffffff" trackColor={{ true: COLORS.primary, false: COLORS.border }} />
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.logoutButton}>
          <MaterialIcons name="logout" size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out Account</Text>
        </Pressable>
        <View style={styles.footerMeta}>
          <Text style={styles.footerText}>Terminal Version 4.2.0-Alpha</Text>
          <Text style={styles.footerTextSmall}>Securely Encrypted Session</Text>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Manrope_700Bold'
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.soft,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 8
  },
  avatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.background
  },
  profileName: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Manrope_700Bold'
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  profileRole: {
    color: COLORS.primary,
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_600SemiBold'
  },
  profileDot: {
    color: COLORS.muted
  },
  profileStatus: {
    color: COLORS.muted,
    fontSize: 12
  },
  profileUid: {
    color: COLORS.muted,
    fontSize: 11
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    marginTop: 8
  },
  editText: {
    color: '#ffffff',
    fontFamily: 'Manrope_700Bold'
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 20
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Manrope_700Bold'
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 6
  },
  statValue: {
    color: COLORS.text,
    fontSize: 18,
    fontFamily: 'Manrope_700Bold'
  },
  statBadge: {
    color: COLORS.primary,
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  sectionHeading: {
    color: COLORS.primary,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'Manrope_700Bold',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8
  },
  listCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden'
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  listIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(14, 165, 233, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Manrope_600SemiBold'
  },
  listSubtitle: {
    color: COLORS.muted,
    fontSize: 11
  },
  preferenceBlock: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)'
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  preferenceValue: {
    color: COLORS.primary,
    fontFamily: 'Manrope_700Bold'
  },
  sliderTrack: {
    height: 6,
    backgroundColor: 'rgba(13,242,13,0.2)',
    borderRadius: 999,
    marginTop: 10
  },
  sliderFill: {
    height: 6,
    width: '50%',
    backgroundColor: COLORS.primary,
    borderRadius: 999
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  sliderLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: 'rgba(13,242,13,0.1)',
    borderRadius: 10,
    padding: 4,
    gap: 6
  },
  segmentActive: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  segmentActiveText: {
    color: '#0a0f0a',
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  segmentInactive: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  segmentInactiveText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontFamily: 'Manrope_700Bold'
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
    backgroundColor: 'rgba(239,68,68,0.1)'
  },
  logoutText: {
    color: '#ef4444',
    fontFamily: 'Manrope_700Bold'
  },
  footerMeta: {
    alignItems: 'center',
    gap: 4,
    opacity: 0.5
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 12
  },
  footerTextSmall: {
    color: COLORS.muted,
    fontSize: 10
  }
});
