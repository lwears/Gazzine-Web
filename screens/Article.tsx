import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, FlatList, Image
} from 'react-native';
import {
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import axios from 'axios';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import buildArticle from '../helpers/buildArticle';
import styles from '../styles/styles';
import baseUrl from '../vars';
import {
  ElementType, Category, Author, ArticleWithBody,
} from '../types';

const Article: NavigationStackScreenComponent = ({ navigation }) => {
  const [article, setArticle] = useState<ArticleWithBody>(undefined);
  const [articleNotFound, setArticleNotFound] = useState<boolean>(false);

  const fetchArticle = async () => {
    const { slug } = navigation.state.params;
    try {
      const { data } = await axios.get(`${baseUrl}?type=SinglePost&slug=${slug}`);
      setArticle(data);
    } catch (error) {
      setArticleNotFound(true);
      console.error(error.message);
    }
  };

  const goBack = () => {
    setArticle(undefined);
    navigation.navigate('ArticleList');
  }

  useEffect(() => {
    setArticleNotFound(false);
    fetchArticle();
    return () => setArticle(undefined);
  }, [navigation]);

  if (articleNotFound) {
    return <NotFound goBack={goBack}/>
  }

  if (!article) {
    return <Loading/>;
  }

  return (
    <ScrollView>
      <Image style={styles.articleTopImage} source={{ uri: article.image }} />
      <View style={styles.articleContainer}>
        <View style={styles.articleCategories}>
          {article.category.map((cat: Category) => (
            <Text key={cat.id} style={styles.articleCategory}>{cat.name}</Text>
          ))}
        </View>
        <View style={styles.articleAuthorContainer}>
          {article.authors.map((author: Author) => (
            <View key={author.id} style={styles.articleAuthor}>
              <Image
                style={styles.articleAuthorImage}
                source={{ uri: author.profilePictureUrl }}
              />
              <Text style={styles.articleAuthorName}>{author.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <FlatList
          data={article.body.elements}
          renderItem={({ item }: { item: ElementType}) => buildArticle(item)}
          keyExtractor={(item: ElementType) => item.k}
        />
      </View>
    </ScrollView>
  );
};

Article.navigationOptions = {
  animationEnabled: false,
};

export default Article;
