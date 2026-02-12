import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Activity, Lock, Mail, Eye, EyeOff } from 'lucide-react-native';
import { styles, COLORS } from '../styles';
import { api } from '../api';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('user@marketpulse.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await api.login(email, password);
    onLogin();
    setLoading(false);
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginCard}>
        <View style={styles.loginBadge}>
          <Activity size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.loginTitle}>PROTRADER</Text>
        <Text style={styles.loginSubtitle}>Market intelligence hub</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email ID</Text>
          <View style={styles.inputRow}>
            <Mail size={18} color={COLORS.muted} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="market-88@pro.com"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Secure Passcode</Text>
          <View style={styles.inputRow}>
            <Lock size={18} color={COLORS.muted} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={COLORS.muted}
              secureTextEntry={!showPassword}
              style={[styles.input, { flex: 1 }]}
            />
            <Pressable onPress={() => setShowPassword((value) => !value)}>
              {showPassword ? <EyeOff size={18} color={COLORS.muted} /> : <Eye size={18} color={COLORS.muted} />}
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>{loading ? 'CONNECTING...' : 'ENTER DASHBOARD'}</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.linkText}>Request Access</Text>
        </Pressable>
      </View>
    </View>
  );
}
