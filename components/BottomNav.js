import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LayoutDashboard, BarChart2, Newspaper, Settings } from 'lucide-react-native';
import { styles, COLORS } from '../styles';

const tabs = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'market', icon: BarChart2, label: 'Markets' },
  { id: 'news', icon: Newspaper, label: 'News' },
  { id: 'profile', icon: Settings, label: 'Profile' }
];

export default function BottomNav({ activeTab, onChange }) {
  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <Pressable key={tab.id} style={styles.navItem} onPress={() => onChange(tab.id)}>
            <Icon size={20} color={isActive ? COLORS.primary : COLORS.muted} strokeWidth={isActive ? 2.5 : 2} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
