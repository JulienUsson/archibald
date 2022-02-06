import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TargetInput from './src/TargetInput';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <TargetInput />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
