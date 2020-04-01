import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navigator from './Navigation/Navigator';
import * as Font from 'expo-font';

export default function App() { 

  useEffect(() => {
    Font.loadAsync({
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
    });
  }, []);

  return (
    <View style={styles.outer}>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
});
