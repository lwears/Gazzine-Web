import React, {FunctionComponent} from 'react'
import {
  View, Text, Button,
} from 'react-native';
import styles from '../styles/styles'

interface Props {
  goBack: Function;
}

export const NotFound: FunctionComponent<Props> = ({ goBack }) => {
  return (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundHeader}>Sorry, this page could not be found.</Text>
      <Text style={styles.notFoundText}>The page you are looking for doesn't exist, no longer exists or has been moved.</Text>
      <Button
        onPress={() => goBack()}
        title="Return to home page"
      />
    </View>
  )
}

export default NotFound;