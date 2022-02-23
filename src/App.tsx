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
import HomeScreen from './screens/Home/HomeScreen';
import theme from './theme';
import FreeTrainingScreen from './screens/FreeTrainingScreen';
import {RootStackParamList} from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const defaultScreenOptions: NativeStackNavigationOptions = {headerShown: false};

export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={{flex: 1}}>
            <Stack.Navigator screenOptions={defaultScreenOptions}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="FreeTraining"
                component={FreeTrainingScreen}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
