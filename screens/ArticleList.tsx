import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import Card from '../components/card';
import { Article } from '../types';
import styles from '../styles/styles';

const ArticleList: NavigationStackScreenComponent = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  
  const updateArticles = async (pageNr: number) => {
    const { data } = await axios.get(`http://localhost:8080/?page=${pageNr}`);
    setArticles([...articles, ...data ]);
  };

  const fetchMoreArticles = async () => {
    updateArticles(page + 1);
    setPage(page + 1);
  };
  
  useEffect(() => { updateArticles(1); }, []);
  
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
      renderItem={({item}: {item: Article}) => <Card article={item} navigation={navigation}/> }
      keyExtractor={(item: Article) => item.id.toString()}
      onEndReached={fetchMoreArticles}
      />
  );
}

ArticleList.navigationOptions = {
  title: "Articles"
}

export default ArticleList;
