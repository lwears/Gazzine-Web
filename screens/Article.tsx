import React, { useState, useEffect} from 'react';
import { ScrollView, View,  Text, FlatList, Image} from 'react-native';
import axios from 'axios';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import buildArticle from '../helpers/buildArticle';
import styles from '../styles/styles'
import { ElementType, Category, Author, ArticleWithBody } from '../types'

const Article: NavigationStackScreenComponent = ({ navigation }) => {
  const [article, setArticle] = useState<ArticleWithBody>(undefined);
  
  const fetchArticle = async () => {
    const { slug } = navigation.state.params;
    try {
      const { data } = await axios.get(`http://localhost:8081/?slug=${slug}`);
      setArticle(data);      
    } catch (error) {
      console.error(error.message);
    }    
  }

  useEffect(() => {
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
          {article.category.map((cat: Category) => <Text key={cat.id} style={styles.articleCategory}>{cat.name}</Text>)}
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
          keyExtractor={(item: any) => item.k}
        />
      </View>
    </ScrollView>
  );
}

export default Article;
