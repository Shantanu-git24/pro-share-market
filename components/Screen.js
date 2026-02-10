import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen({ children, style, edges = ['top'] }) {
  return (
    <SafeAreaView style={[{ flex: 1 }, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
