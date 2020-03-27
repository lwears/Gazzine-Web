import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Article({ navigation }) {
  
  console.log(navigation.state.params.id);
  
  
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Article.navigationOptions = {
  title: "Article"
}

Article.path = "article";

export default Article;
