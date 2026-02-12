import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import DashboardScreen from './screens/DashboardScreen';
import HeatmapScreen from './screens/HeatmapScreen';
import NewsScreen from './screens/NewsScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import ProfileScreen from './screens/ProfileScreen';
import MutualFundsScreen from './screens/MutualFundsScreen';
import StockDetailScreen from './screens/StockDetailScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import MenuScreen from './screens/MenuScreen';
import BottomNav from './components/BottomNav';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [{ fontFamily: 'Manrope_400Regular' }, Text.defaultProps.style];
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = [{ fontFamily: 'Manrope_400Regular' }, TextInput.defaultProps.style];

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    border: 'rgba(15, 23, 42, 0.12)'
  }
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute'
        }
      }}
      tabBar={({ state, navigation }) => (
        <BottomNav
          activeTab={state.routes[state.index].name}
          onChange={(tabId) => navigation.navigate(tabId)}
        />
      )}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Heatmap" component={HeatmapScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold
  });
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setFontReady(true);
      return undefined;
    }

    const timeout = setTimeout(() => {
      setFontReady(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [fontsLoaded]);

  if (!fontReady) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8fafc', alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="dark" />
        <Text style={{ color: '#0f172a', fontSize: 14, fontFamily: 'Manrope_500Medium' }}>Loading interface...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="StockDetail" component={StockDetailScreen} />
          <Stack.Screen name="Watchlist" component={WatchlistScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="MutualFunds" component={MutualFundsScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
