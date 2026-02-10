import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles';

export default function GlassCard({ children, style }) {
  return <View style={[styles.glassCard, style]}>{children}</View>;
}
