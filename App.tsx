import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GameScreen from './src/GameScreen';
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameScreen />
    </GestureHandlerRootView>
  );
}
