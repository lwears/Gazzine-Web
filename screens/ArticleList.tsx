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
  const [category, setCategory] = useState<number>(undefined)

  const updateCategory = (id: number) => {
    if(id === category) {
      setCategory(undefined);
      setPage(1);
      setArticles([]);
    } else {
      setCategory(id);
    }
  }
  
  const updateArticles = async (pageNr: number) => {
    const { data } = await axios.get(`http://localhost:8080/?page=${pageNr}`);
    setArticles([...articles, ...data ]);
    console.log(pageNr);
  };

  const fetchMoreArticles = async () => {
    if ( category ) {
      fetchMoreOnCategory(page);
    } else {
      updateArticles(page + 1);
      setPage(page + 1);
    }
  };

  const fetchFirstOnCategory = async () => {
    const { data } = await axios.get(`http://localhost:8080/?page=1&category=${category}`);
    setArticles(data);
    setPage(1);
  };

  const fetchMoreOnCategory = async (pageNr: number) => {
    const { data } = await axios.get(`http://localhost:8080/?page=${pageNr+1}&category=${category}`);
    setArticles([...articles, ...data]);
    setPage(page +1 );
  };
  
  useEffect(() => { updateArticles(1); }, []);

  useEffect(() => {
    fetchFirstOnCategory();
  }, [category]);
  
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
      renderItem={({item}: {item: Article}) => <Card article={item} navigation={navigation} updateCategory={updateCategory}/>}
        
        // if(!category) {
        //   return <Card article={item} navigation={navigation} updateCategory={updateCategory}/> 
        // } else {
        //   const catIds = item.category.map(cat => cat.id);
        //   if (catIds.includes(category)) {
        //     return <Card article={item} navigation={navigation} updateCategory={updateCategory}/>
        //   }
        // }
      keyExtractor={(item: Article) => item.id.toString()}
      onEndReached={fetchMoreArticles}
      />
  );
}

ArticleList.navigationOptions = {
  title: "Articles"
}

export default ArticleList;
