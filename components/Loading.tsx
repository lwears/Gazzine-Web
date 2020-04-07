import React from 'react'
import { View, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';

export default function Loading() {
  return (
    <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>
  )
}
