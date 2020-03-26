import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [articles, setArticles] = useState(undefined);

  const updateArticles = () => {
    axios.get('http://localhost:8080')
      .then(res => res.data)
      .then(data => setArticles(data));
  }

  useEffect(() => {
    updateArticles();
  }, []);

  if (articles === undefined) {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(articles)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
