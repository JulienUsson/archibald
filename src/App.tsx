/* eslint-disable react-native/no-inline-styles */
import './i18n';
import {ThemeProvider} from '@emotion/react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import theme from './theme';

const Stack = createNativeStackNavigator();
const defaultScreenOptions: NativeStackNavigationOptions = {headerShown: false};

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={{flex: 1}}>
            <Stack.Navigator screenOptions={defaultScreenOptions}>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
