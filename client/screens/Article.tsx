import React, { useState, useEffect} from 'react';
import { ScrollView, View,  Text, FlatList, Image} from 'react-native';
import axios from 'axios';
import buildArticle from '../helpers/buildArticle';
import styles from '../styles/styles'

const Article = ({ navigation, route }) => {
  const [article, setArticle] = useState(undefined);
  
  const fetchArticle = async () => {
    const { slug } = navigation.state.params;
    const { data } = await axios.get(`http://localhost:8081/?slug=${slug}`);
    setArticle(data);
  }

  useEffect(() => {
    fetchArticle();
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
      <Image style={styles.topImage} source={{uri: article.image}}/>
      <FlatList
        data={article.category}
        renderItem={({ item }: { item: any}) => <Text style={styles.quote}>{item.name}</Text>}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <Text>{article.authors[0].name}</Text>
      <Image style={styles.image} source={{ uri: article.authors[0].profilePictureUrl}} />
      <Text>{article.title}</Text>
      <FlatList
        data={article.body.elements}
        renderItem={({ item }: { item: any}) => buildArticle(item)}
        keyExtractor={(item: any, i: number) => i.toString()}
      />
    </ScrollView>
  );
}

export default Article;
