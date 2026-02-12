import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LayoutDashboard, Grid, Newspaper, Wallet, Settings } from 'lucide-react-native';
import { styles, COLORS } from '../styles';

const tabs = [
  { id: 'Dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'Heatmap', icon: Grid, label: 'Heatmap' },
  { id: 'News', icon: Newspaper, label: 'News' },
  { id: 'Portfolio', icon: Wallet, label: 'Portfolio' },
  { id: 'Profile', icon: Settings, label: 'Profile' }
];

export default function BottomNav({ activeTab, onChange }) {
  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => onChange(tab.id)}
          >
            {isActive && <View style={styles.navActiveHalo} />}
            <View style={[styles.navIconWrap, isActive && styles.navIconWrapActive]}>
              <Icon
                size={20}
                color={isActive ? '#ffffff' : COLORS.text}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </View>
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{tab.label}</Text>
            {isActive && <View style={styles.navActiveDot} />}
          </Pressable>
        );
      })}
    </View>
  );
}
