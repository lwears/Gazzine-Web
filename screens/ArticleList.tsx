import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import Card from '../components/card';
import { Article } from '../types';
import styles from '../styles/styles';

const ArticleList: NavigationStackScreenComponent = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<number>(undefined)
  const [author, setAuthor] = useState<number>(undefined)
  const [moreArticles, setMoreArticles] = useState<boolean>(true)
  // let flatlistRef;

  const resetState = () => {
      setPage(1);
      setMoreArticles(true);
      setArticles([]);
  }

  const updateCategory = (id: number) => {
    if(id === category) {
      setCategory(undefined);
    } else {
      setCategory(id);
      setAuthor(undefined)
    }
    resetState();
  }

  const updateAuthor = (id: number) => {
    if(id === author) {
      setAuthor(undefined);
    } else {
      setAuthor(id);
      setCategory(undefined)
    }
    resetState();
  }
  
  const updateArticles = async (pageNr: number) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/?page=${pageNr}`);
      setArticles([...articles, ...data ]);
    } catch(err) {
      setMoreArticles(false);
    }
  };

  const fetchMoreArticles = async () => {
    if( moreArticles ) {
      if ( category || author ) {
        fetchMoreOnCategory(page + 1);
        setPage(page + 1);
      } else {
        updateArticles(page + 1);
        setPage(page + 1);
      }
    }
  };

  const fetchMoreOnCategory = async (pageNr: number) => {
    const categoryValue = category ? category : '';
    const authorValue = author ? author : '';
    try {
      const { data } = await axios.get(`http://localhost:8080/?page=${pageNr}&category=${categoryValue}&author=${authorValue}`);
      setArticles([...articles, ...data]);
    } catch(err) {
      setMoreArticles(false);
    }
  };
  
  useEffect(() => { updateArticles(1); }, []);

  useEffect(() => {
    fetchMoreOnCategory(1);
  }, [category, author]);
  
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
      renderItem={({item}: {item: Article}) => <Card article={item} navigation={navigation} update={{updateCategory, updateAuthor}}/>}
      keyExtractor={(item: Article) => item.id.toString()}
      onEndReached={fetchMoreArticles}
      // ref={ref => {flatlistRef = ref}}
      />
  );
}

ArticleList.navigationOptions = {
  title: "Articles"
}

export default ArticleList;
