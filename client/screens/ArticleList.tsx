import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import Card from '../components/card';

function ArticleList({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  
  const updateArticles = async (pageNr) => {
    const {data} = await axios.get(`http://localhost:8080/?page=${pageNr}`);
    setArticles([...articles, ...data ]);
  };

  const fetchMoreArticles = async () => {
    updateArticles(page + 1);
    setPage(page + 1);
  };
  
  useEffect(() => {
    
    updateArticles(1);
  }, []);
  
  if (articles.length === 0) {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    )
  }
  
  return (
    <FlatList
      data={articles}
      renderItem={({item}) => <Card article={item} navigation={navigation} /> }
      keyExtractor={item => item.id.toString()}
      onEndReached={fetchMoreArticles}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ArticleList.navigationOptions = {
  title: "Articles"
}

ArticleList.path = "";

export default ArticleList;
