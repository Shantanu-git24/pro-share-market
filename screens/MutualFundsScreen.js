import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';

const COLORS = {
    primary: '#13ecec',
    background: '#0a1414',
    card: '#162a2a',
    gold: '#d4af37',
    success: '#39ff14',
    danger: '#ef4444',
    text: '#ffffff',
    muted: 'rgba(255,255,255,0.6)',
    border: 'rgba(19,236,236,0.12)'
};

const indices = [
    { label: 'NIFTY 50', value: '22,038.40', change: '+184.20 (0.84%)', up: true },
    { label: 'SENSEX', value: '72,540.30', change: '+560.15 (0.78%)', up: true },
    { label: 'BANK NIFTY', value: '47,215.10', change: '-112.45 (0.24%)', up: false }
];

const topGainers = [
    {
        symbol: 'RELIANCE',
        name: 'Reliance Industries Ltd',
        price: '2,945.30',
        change: '+4.25%',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtJ_u_H-QT7yehl7yeVXiGZ54-iAu7NH8jH9QZcFeMPAxEeet5CVmcA5R2zieUpSE_hsv2a6ubXF9NwU0nzcUKy97HXfWI9WGyK8J5ghSHcHWAd-3nBG2ygvCk5jDNtHkIQYkSAbgsUG_afOjnSlbPExJuSoyeO2W58_kkHk31fGohsD4PxGXpK3LtBPk7JtI2vMTC_RsyNVno2AGSQlAEjwYdL_GVwyN1krsczhWbaskI8PAFQYbp3rpioiFqm3FsI8UdYVAwjUs'
    },
    {
        symbol: 'HDFCBANK',
        name: 'HDFC Bank Limited',
        price: '1,442.10',
        change: '+3.80%',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADuEXx08EzfQCkbDAjoVBJx65qJJQfOguvNXMOs4EzgqvfMaZsCU6t8dqvpQUnU6Ncag5ozeOO_xSIq5MhZ15PQO6Sy3yi1LLH4mS315L_3fAuYAGkL9cCxRf5xPn320ChylxG1gWWscm3SXAtziXtsopvhhreopZBC1niCghHKVNH4DDTut2Budyhau-9nuoi5rzok8fzzlQhXJZI4lHwALrCPGT40YT_9AHrH1mfqAbMmXK-Lzu-gq1TgzbEK1K0lpu3NFscbMY'
    },
    {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        price: '3,912.45',
        change: '+2.15%',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB92O_jx1kTyDvVIPBhTxtQyu3oaeaovokYAUoipohH4jmL1bcfHaBQp-XQZJc0gpnxpcTifAGaacZ3WGAQnZWxB5WSHf8vQ1neo8x6KkzIfLpEqk5P26x9u79LnQQxN3nXWn_WsXrUUOsrG-k_KRVmymzDc88Ez6-3ynz8AlUf9x2qgjbGiZZGqkQ2wzU8NNkLjupJxACQST7rXoNL83U8m0p75c2bBOOoYY6geVH4iVtzV4hZD-pzFuhHh8L9yRfpgZfNMIdpcuY'
    }
];

const metals = [
    {
        label: 'Gold 24K',
        value: '₹62,450',
        unit: 'Per 10 Grams',
        change: '+0.42%',
        up: true,
        accent: COLORS.gold,
        icon: 'stars'
    },
    {
        label: 'Silver',
        value: '₹71,200',
        unit: 'Per 1 Kilogram',
        change: '-0.15%',
        up: false,
        accent: '#94a3b8',
        icon: 'diamond'
    }
];

const funds = [
    {
        name: 'Quant Active Fund',
        category: 'Multi Cap',
        return: '34.2%',
        icon: 'trending-up',
        accent: '#1111d4',
        chip: 'rgba(17,17,212,0.2)'
    },
    {
        name: 'ICICI Pru Bluechip',
        category: 'Large Cap',
        return: '22.1%',
        icon: 'shield',
        accent: '#f59e0b',
        chip: 'rgba(245,158,11,0.2)'
    },
    {
        name: 'UTI Nifty 50 Index',
        category: 'Index Fund',
        return: '18.5%',
        icon: 'data-usage',
        accent: '#3b82f6',
        chip: 'rgba(59,130,246,0.2)'
    },
    {
        name: 'Mirae Asset Tax',
        category: 'ELSS Fund',
        return: '20.8%',
        icon: 'account-balance',
        accent: '#10b981',
        chip: 'rgba(16,185,129,0.2)'
    }
];

const segments = ['Stocks', 'MFs', 'Metals', 'Indices'];

export default function MutualFundsScreen() {
    const navigation = useNavigation();
    const [activeSegment, setActiveSegment] = useState('MFs');

    return (
        <Screen style={styles.root}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.headerIcon}>
                            <MaterialIcons name="account-balance-wallet" size={18} color={COLORS.primary} />
                        </View>
                        <View>
                            <Text style={styles.headerLabel}>Invested Value</Text>
                            <Text style={styles.headerValue}>₹14,82,450.00</Text>
                        </View>
                    </View>
                    <View style={styles.headerActions}>
                        <Pressable style={styles.headerButton}>
                            <MaterialIcons name="search" size={18} color={COLORS.primary} />
                        </Pressable>
                        <Pressable style={styles.headerButton}>
                            <MaterialIcons name="notifications" size={18} color={COLORS.primary} />
                            <View style={styles.notificationDot} />
                        </Pressable>
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tickerRow}
                >
                    {indices.map((item) => (
                        <View
                            key={item.label}
                            style={[
                                styles.tickerCard,
                                { borderLeftColor: item.up ? COLORS.success : COLORS.danger }
                            ]}
                        >
                            <Text style={styles.tickerLabel}>{item.label}</Text>
                            <Text style={styles.tickerValue}>{item.value}</Text>
                            <View style={styles.tickerChangeRow}>
                                <MaterialIcons
                                    name={item.up ? 'trending-up' : 'trending-down'}
                                    size={12}
                                    color={item.up ? COLORS.success : COLORS.danger}
                                />
                                <Text
                                    style={[
                                        styles.tickerChange,
                                        { color: item.up ? COLORS.success : COLORS.danger }
                                    ]}
                                >
                                    {item.change}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.segmentedControl}>
                    {segments.map((segment) => {
                        const isActive = segment === activeSegment;
                        return (
                            <Pressable
                                key={segment}
                                style={[styles.segmentChip, isActive && styles.segmentChipActive]}
                                onPress={() => {
                                    setActiveSegment(segment);
                                    if (segment === 'Stocks') {
                                        navigation.navigate('MainTabs', { screen: 'Dashboard' });
                                    }
                                }}
                            >
                                <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
                                    {segment}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.portfolioCard}>
                    <LinearGradient
                        colors={[COLORS.card, COLORS.background]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.portfolioGradient}
                    >
                        <View style={styles.portfolioGlow} />
                        <View style={styles.portfolioHeader}>
                            <View>
                                <Text style={styles.portfolioLabel}>Day's Profit</Text>
                                <Text style={styles.portfolioValue}>+ ₹12,840.40</Text>
                            </View>
                            <View style={styles.portfolioBadge}>
                                <MaterialIcons name="arrow-upward" size={12} color={COLORS.success} />
                                <Text style={styles.portfolioBadgeText}>3.2%</Text>
                            </View>
                        </View>
                        <View style={styles.portfolioGrid}>
                            <View style={styles.portfolioMiniCard}>
                                <Text style={styles.portfolioMiniLabel}>Today's Returns</Text>
                                <Text style={styles.portfolioMiniValue}>+ ₹4,210</Text>
                            </View>
                            <View style={styles.portfolioMiniCard}>
                                <Text style={styles.portfolioMiniLabel}>Available Cash</Text>
                                <Text style={styles.portfolioMiniValue}>₹85,140</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>

                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <View style={[styles.sectionMarker, { backgroundColor: '#1111d4' }]} />
                        <Text style={styles.sectionTitle}>Mutual Funds</Text>
                    </View>
                    <Pressable>
                        <Text style={styles.sectionActionBlue}>View All</Text>
                    </Pressable>
                </View>
                <View style={styles.mfGrid}>
                    {funds.map((fund) => (
                        <View key={fund.name} style={styles.mfCard}>
                            <View style={[styles.mfIconWrap, { backgroundColor: fund.chip }]}
                            >
                                <MaterialIcons name={fund.icon} size={16} color={fund.accent} />
                            </View>
                            <Text style={styles.mfTitle}>{fund.name}</Text>
                            <Text style={styles.mfCategory}>{fund.category}</Text>
                            <View style={styles.mfReturnBlock}>
                                <Text style={styles.mfReturnLabel}>3Y Return</Text>
                                <Text style={styles.mfReturnValue}>
                                    {fund.return} <Text style={styles.mfReturnUnit}>p.a.</Text>
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <View style={[styles.sectionMarker, { backgroundColor: COLORS.primary }]} />
                        <Text style={styles.sectionTitle}>Top Gainers</Text>
                    </View>
                    <Pressable>
                        <Text style={styles.sectionAction}>View All</Text>
                    </Pressable>
                </View>
                <View style={styles.sectionList}>
                    {topGainers.map((item) => (
                        <View key={item.symbol} style={styles.gainerCard}>
                            <View style={styles.gainerLeft}>
                                <View style={styles.logoBox}>
                                    <Image source={{ uri: item.logo }} style={styles.logoImage} />
                                </View>
                                <View>
                                    <Text style={styles.gainerSymbol}>{item.symbol}</Text>
                                    <Text style={styles.gainerName}>{item.name}</Text>
                                </View>
                            </View>
                            <View style={styles.gainerRight}>
                                <Text style={styles.gainerPrice}>₹{item.price}</Text>
                                <Text style={styles.gainerChange}>{item.change}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <View style={[styles.sectionMarker, { backgroundColor: COLORS.gold }]} />
                        <Text style={styles.sectionTitle}>Metals & Commodities</Text>
                    </View>
                    <Text style={styles.sectionMeta}>Live MCX</Text>
                </View>
                <View style={styles.metalGrid}>
                    {metals.map((metal) => (
                        <View key={metal.label} style={styles.metalCard}>
                            <View style={[styles.metalIconWrap, { backgroundColor: `${metal.accent}1A` }]}>
                                <MaterialIcons name={metal.icon} size={28} color={metal.accent} />
                            </View>
                            <Text style={[styles.metalLabel, { color: metal.accent }]}>{metal.label}</Text>
                            <Text style={styles.metalValue}>{metal.value}</Text>
                            <Text style={styles.metalUnit}>{metal.unit}</Text>
                            <View style={styles.metalFooter}>
                                <Text style={[styles.metalChange, { color: metal.up ? COLORS.success : COLORS.danger }]}>
                                    {metal.change}
                                </Text>
                                <View style={styles.metalDivider}>
                                    <View style={[styles.metalDividerLine, { backgroundColor: metal.accent }]} />
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
        paddingBottom: 140,
        paddingTop: 8
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(19,236,236,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(19,236,236,0.3)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        fontFamily: 'Manrope_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    headerValue: {
        color: COLORS.text,
        fontSize: 20,
        fontFamily: 'Manrope_800ExtraBold',
        marginTop: 2
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(22,42,42,0.6)',
        borderWidth: 1,
        borderColor: 'rgba(19,236,236,0.12)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 2,
        borderColor: COLORS.background
    },
    tickerRow: {
        paddingHorizontal: 20,
        gap: 12,
        paddingBottom: 12
    },
    tickerCard: {
        width: 150,
        borderRadius: 16,
        padding: 12,
        backgroundColor: 'rgba(22,42,42,0.6)',
        borderWidth: 1,
        borderColor: 'rgba(19,236,236,0.12)',
        borderLeftWidth: 3
    },
    tickerLabel: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: 10,
        fontFamily: 'Manrope_700Bold'
    },
    tickerValue: {
        color: COLORS.text,
        fontSize: 14,
        fontFamily: 'Manrope_800ExtraBold',
        marginTop: 6
    },
    tickerChangeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6
    },
    tickerChange: {
        fontSize: 10,
        fontFamily: 'Manrope_700Bold'
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: 'rgba(22,42,42,0.6)',
        borderRadius: 14,
        marginHorizontal: 20,
        padding: 4,
        gap: 4,
        marginBottom: 18
    },
    segmentChip: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center'
    },
    segmentChipActive: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 }
    },
    segmentText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        fontFamily: 'Manrope_700Bold'
    },
    segmentTextActive: {
        color: COLORS.background
    },
    portfolioCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 22,
        borderWidth: 1,
        borderColor: 'rgba(19,236,236,0.2)'
    },
    portfolioGradient: {
        padding: 18
    },
    portfolioGlow: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(19,236,236,0.12)'
    },
    portfolioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    portfolioLabel: {
        color: 'rgba(19,236,236,0.8)',
        fontSize: 10,
        fontFamily: 'Manrope_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    portfolioValue: {
        color: COLORS.success,
        fontSize: 26,
        fontFamily: 'Manrope_800ExtraBold',
        marginTop: 4
    },
    portfolioBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(57,255,20,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    portfolioBadgeText: {
        color: COLORS.success,
        fontSize: 10,
        fontFamily: 'Manrope_700Bold'
    },
    portfolioGrid: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16
    },
    portfolioMiniCard: {
        flex: 1,
        padding: 12,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)'
    },
    portfolioMiniLabel: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        fontFamily: 'Manrope_700Bold',
        textTransform: 'uppercase'
    },
    portfolioMiniValue: {
        color: COLORS.text,
        fontSize: 14,
        fontFamily: 'Manrope_800ExtraBold',
        marginTop: 6
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 12
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    sectionMarker: {
        width: 6,
        height: 22,
        borderRadius: 999
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontFamily: 'Manrope_800ExtraBold'
    },
    sectionAction: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: 'Manrope_700Bold'
    },
    sectionActionBlue: {
        color: '#1111d4',
        fontSize: 12,
        fontFamily: 'Manrope_700Bold'
    },
    sectionMeta: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 10,
        fontFamily: 'Manrope_700Bold'
    },
    sectionList: {
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 20
    },
    gainerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 18,
        backgroundColor: 'rgba(22,42,42,0.6)',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderLeftWidth: 2,
        borderLeftColor: COLORS.success
    },
    gainerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    logoBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    gainerSymbol: {
        color: COLORS.text,
        fontSize: 13,
        fontFamily: 'Manrope_800ExtraBold'
    },
    gainerName: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 10,
        fontFamily: 'Manrope_500Medium'
    },
    gainerRight: {
        alignItems: 'flex-end'
    },
    gainerPrice: {
        color: COLORS.text,
        fontSize: 13,
        fontFamily: 'Manrope_800ExtraBold'
    },
    gainerChange: {
        color: COLORS.success,
        fontSize: 12,
        fontFamily: 'Manrope_700Bold'
    },
    metalGrid: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    metalCard: {
        flex: 1,
        borderRadius: 18,
        padding: 16,
        backgroundColor: 'rgba(22,42,42,0.6)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)'
    },
    metalIconWrap: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    metalLabel: {
        fontSize: 10,
        fontFamily: 'Manrope_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    metalValue: {
        color: COLORS.text,
        fontSize: 18,
        fontFamily: 'Manrope_800ExtraBold',
        marginTop: 8
    },
    metalUnit: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        fontFamily: 'Manrope_500Medium',
        marginTop: 4
    },
    metalFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14
    },
    metalChange: {
        fontSize: 10,
        fontFamily: 'Manrope_700Bold'
    },
    metalDivider: {
        width: 48,
        height: 8,
        borderRadius: 6,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    metalDividerLine: {
        width: 30,
        height: 2,
        borderRadius: 2
    },
    mfGrid: {
        paddingHorizontal: 20,
        gap: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    mfCard: {
        width: '48%',
        minHeight: 172,
        borderRadius: 16,
        padding: 16,
        backgroundColor: 'rgba(17,17,212,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(17,17,212,0.2)'
    },
    mfIconWrap: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    mfTitle: {
        color: COLORS.text,
        fontSize: 12,
        fontFamily: 'Manrope_800ExtraBold',
        lineHeight: 16
    },
    mfCategory: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 9,
        fontFamily: 'Manrope_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 4
    },
    mfReturnBlock: {
        marginTop: 16
    },
    mfReturnLabel: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 9,
        fontFamily: 'Manrope_500Medium'
    },
    mfReturnValue: {
        color: '#10b981',
        fontSize: 16,
        fontFamily: 'Manrope_800ExtraBold',
        marginTop: 6
    },
    mfReturnUnit: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 9,
        fontFamily: 'Manrope_500Medium'
    }
});
