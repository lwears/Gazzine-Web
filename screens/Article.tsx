import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Text, FlatList, Image, ActivityIndicator, Button
} from 'react-native';
import axios from 'axios';
import {
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import buildArticle from '../helpers/buildArticle';
import styles from '../styles/styles';
import {
  ElementType, Category, Author, ArticleWithBody,
} from '../types';

const Article: NavigationStackScreenComponent = ({ navigation }) => {
  const [article, setArticle] = useState<ArticleWithBody>(undefined);
  const [articleNotFound, setArticleNotFound] = useState<boolean>(false);

  const fetchArticle = async () => {
    const { slug } = navigation.state.params;
    try {
      const { data } = await axios.get(`http://localhost:8080/?type=SinglePost&slug=${slug}`);
      setArticle(data);
    } catch (error) {
      setArticleNotFound(true);
      console.error(error.message);
    }
  };

  const goBack = () => {
    setArticleNotFound(false);
    setArticle(undefined);
    navigation.navigate('ArticleList');
  }

  useEffect(() => {
    fetchArticle();
    return () => { 
      setArticle(undefined); 
      setArticleNotFound(false);
    };
  }, [navigation]);

  if (articleNotFound) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundHeader}>Sorry, this page could not be found.</Text>
        <Text style={styles.notFoundText}>The page you are looking for doesn't exist, no longer exists or has been moved.</Text>
        <Button
          onPress={goBack}
          title="Return to home page"
        />
      </View>
    )
  }

  if (!article) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
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
        <View>
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
