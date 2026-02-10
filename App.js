import 'react-native-gesture-handler';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import DashboardScreen from './screens/DashboardScreen';
import HeatmapScreen from './screens/HeatmapScreen';
import NewsScreen from './screens/NewsScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import ProfileScreen from './screens/ProfileScreen';
import StockDetailScreen from './screens/StockDetailScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';

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
    background: '#0a0a14',
    card: '#0a0a14',
    text: '#ffffff',
    border: 'rgba(255,255,255,0.08)'
  }
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a14',
          borderTopColor: 'rgba(255,255,255,0.08)',
          height: 64,
          paddingBottom: 10,
          paddingTop: 8
        },
        tabBarActiveTintColor: '#1111d4',
        tabBarInactiveTintColor: '#7f86a3',
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Manrope_700Bold'
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Dashboard: 'dashboard',
            Heatmap: 'grid-on',
            News: 'article',
            Portfolio: 'account-balance-wallet',
            Profile: 'settings'
          };
          return <MaterialIcons name={iconMap[route.name]} size={size} color={color} />;
        }
      })}
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

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0a14', alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="light" />
        <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Manrope_500Medium' }}>Loading interface...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={AppTheme}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="StockDetail" component={StockDetailScreen} />
          <Stack.Screen name="Watchlist" component={WatchlistScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
