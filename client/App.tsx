import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Navigator from './Navigation/Navigator';

export default function App() { 
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
