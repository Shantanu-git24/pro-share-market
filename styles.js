import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

export const COLORS = {
  primary: '#1111d4',
  accent: '#0bda68',
  danger: '#ff4d4d',
  bgDark: '#0a0a14',
  cardDark: '#161633',
  muted: '#8b93a7'
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24
};

export const { width: screenWidth } = Dimensions.get('window');
export const cardWidth = (screenWidth - spacing.xl * 2 - spacing.md) / 2;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bgDark
  },
  content: {
    flex: 1
  },
  glassCard: {
    backgroundColor: 'rgba(22, 22, 51, 0.75)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: spacing.lg
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || spacing.md) : spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(10, 10, 20, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  headerSubtitle: {
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
    textTransform: 'uppercase',
    marginTop: 2
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(22, 22, 51, 0.8)'
  },
  iconButtonActive: {
    backgroundColor: 'rgba(22, 22, 51, 1)'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.primary
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(10, 10, 20, 0.98)'
  },
  navItem: {
    alignItems: 'center',
    gap: 4
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: COLORS.muted
  },
  navLabelActive: {
    color: COLORS.primary
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl
  },
  loginCard: {
    backgroundColor: COLORS.cardDark,
    borderRadius: 24,
    padding: spacing.xl,
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  loginBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(17, 17, 212, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  loginSubtitle: {
    color: COLORS.muted,
    fontSize: 13,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  inputGroup: {
    gap: 8
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.muted,
    textTransform: 'uppercase',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(10, 10, 20, 0.6)',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },
  input: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    flex: 1
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  linkText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold',
    textAlign: 'center'
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl
  },
  screenScroll: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 120,
    gap: spacing.lg
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  portfolioCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    padding: spacing.xl,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 }
  },
  portfolioLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'SpaceGrotesk_500Medium'
  },
  portfolioRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  portfolioValue: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  portfolioBadge: {
    backgroundColor: 'rgba(11, 218, 104, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999
  },
  portfolioBadgeText: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  portfolioChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.md
  },
  portfolioChangeText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  sectionAction: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  watchItem: {
    backgroundColor: 'rgba(22, 22, 51, 0.7)',
    borderRadius: 18,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  watchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  watchBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(17, 17, 212, 0.15)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  watchBadgeText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  watchName: {
    color: 'white',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  watchVolume: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  watchRight: {
    alignItems: 'flex-end'
  },
  watchPrice: {
    color: 'white',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  watchChange: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  allocationCard: {
    gap: spacing.md
  },
  allocationRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    alignItems: 'center'
  },
  allocationLegend: {
    gap: spacing.sm
  },
  allocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  allocationDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  allocationLabel: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_400Regular',
    minWidth: 60
  },
  allocationValue: {
    color: 'white',
    fontWeight: '700',
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  pageTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold',
    marginVertical: spacing.lg
  },
  marketList: {
    paddingBottom: 140
  },
  marketRow: {
    gap: spacing.md
  },
  marketCard: {
    width: cardWidth,
    backgroundColor: 'rgba(22, 22, 51, 0.7)',
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: spacing.md
  },
  marketSymbol: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  marketName: {
    color: COLORS.muted,
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold',
    letterSpacing: 1,
    marginBottom: spacing.sm
  },
  marketChart: {
    height: 40
  },
  marketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm
  },
  marketPrice: {
    color: 'white',
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  marketBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  marketBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  badgeAccent: {
    backgroundColor: 'rgba(11, 218, 104, 0.15)'
  },
  badgeDanger: {
    backgroundColor: 'rgba(255, 77, 77, 0.15)'
  },
  addCard: {
    width: cardWidth,
    height: 160,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm
  },
  addCardText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  newsTitle: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  newsLive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  newsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent
  },
  newsLiveText: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  newsCard: {
    padding: 0,
    overflow: 'hidden'
  },
  newsImageWrap: {
    height: 180
  },
  newsImage: {
    width: '100%',
    height: '100%'
  },
  newsTag: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  tagAccent: {
    backgroundColor: COLORS.accent
  },
  tagDanger: {
    backgroundColor: COLORS.danger
  },
  newsTagText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  newsBody: {
    padding: spacing.lg,
    gap: spacing.sm
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  newsCategory: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  newsTime: {
    color: COLORS.muted,
    fontSize: 10,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  newsHeadline: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  newsSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  newsAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2a2a4a'
  },
  newsSourceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'SpaceGrotesk_500Medium'
  },
  profileHeader: {
    alignItems: 'center',
    gap: spacing.sm
  },
  profileAvatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(17, 17, 212, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55
  },
  profileBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.bgDark
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  profileRole: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  profileMetaDot: {
    color: COLORS.muted,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  profileStatus: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  sectionOverline: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  securityCard: {
    padding: 0,
    overflow: 'hidden'
  },
  securityRow: {
    padding: spacing.lg
  },
  securityRowDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)'
  },
  securityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(17, 17, 212, 0.12)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  securityLabel: {
    color: 'white',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  securityDesc: {
    color: COLORS.muted,
    fontSize: 11,
    fontFamily: 'SpaceGrotesk_400Regular'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 77, 0.3)',
    backgroundColor: 'rgba(255, 77, 77, 0.08)'
  },
  logoutText: {
    color: COLORS.danger,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  detailCard: {
    backgroundColor: 'rgba(22, 22, 51, 0.7)',
    borderRadius: 24,
    padding: spacing.xl,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  detailSymbol: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  detailName: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  detailPrice: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  detailChange: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  detailChart: {
    marginTop: spacing.lg
  },
  tradeRow: {
    flexDirection: 'row',
    gap: spacing.md
  },
  tradeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: 'center'
  },
  tradeBuy: {
    backgroundColor: COLORS.accent
  },
  tradeSell: {
    backgroundColor: COLORS.danger
  },
  tradeButtonText: {
    color: 'white',
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk_700Bold'
  },
  textAccent: {
    color: COLORS.accent,
    fontFamily: 'SpaceGrotesk_600SemiBold'
  },
  textDanger: {
    color: COLORS.danger,
    fontFamily: 'SpaceGrotesk_600SemiBold'
  }
});
