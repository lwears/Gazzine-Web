import React, { useState, useEffect} from 'react';
import { ScrollView, View,  Text, FlatList, Image} from 'react-native';
import axios from 'axios';
import buildArticle from '../helpers/buildArticle';
import styles from '../styles/styles'
import { ElementType, Category, Author } from '../types'
// import * as Font from 'expo-font';

const Article = ({ navigation }) => {
  const [article, setArticle] = useState(undefined);
  
  const fetchArticle = async () => {
    const { slug } = navigation.state.params;
    const { data } = await axios.get(`http://localhost:8081/?slug=${slug}`);
    setArticle(data);
  }

  useEffect(() => {
    // Font.loadAsync({
    //   'roboto-medium': require('../assets/fonts/Roboto-Medium.ttf'),
    //   'roboto-light': require('../assets/fonts/Roboto-Light.ttf'),
    //   'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf')
    // });
    fetchArticle();
    return () => {setArticle(undefined)}
  }, []);
  
  if(article === undefined) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  return (
    <ScrollView>
      <Image style={styles.articleTopImage} source={{uri: article.image}}/>
      <View style={styles.articleContainer}>
        <View style={styles.articleCategories}>
          {article.category.map((cat: Category, i: number) => <Text key={i} style={styles.articleCategory}>{cat.name}</Text>)}
        </View>
        <View>
          {article.authors.map((author: Author) => {
            return (
              <View key={author.id} style={styles.articleAuthor}>
                <Image style={styles.articleAuthorImage} source={{ uri: author.profilePictureUrl}} />
                <Text style={styles.articleAuthorName} >{author.name}</Text>
              </View>
            )
          })}
        </View>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <FlatList
          data={article.body.elements}
          renderItem={({ item }: { item: ElementType}) => buildArticle(item)}
          keyExtractor={(item: any, i: number) => i.toString()}
        />
      </View>
    </ScrollView>
  );
}

export default Article;
