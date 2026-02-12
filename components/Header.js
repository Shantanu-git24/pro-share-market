import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { ChevronLeft, Bell, Activity } from 'lucide-react-native';
import { styles, COLORS } from '../styles';

export default function Header({ title, showBack = false, onBack = () => {} }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.iconButton}>
            <ChevronLeft size={20} color={COLORS.text} />
          </Pressable>
        ) : (
          <View style={[styles.iconButton, styles.iconButtonActive]}>
            <Activity size={20} color={COLORS.primary} />
          </View>
        )}
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          {!showBack && <Text style={styles.headerSubtitle}>Market Center</Text>}
        </View>
      </View>
      <View style={styles.headerRight}>
        <Pressable style={styles.iconButton}>
          <Bell size={18} color={COLORS.text} />
        </Pressable>
        <Image
          source={{ uri: 'https://picsum.photos/seed/user/100' }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}
