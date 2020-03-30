import React, { useState, useEffect, FunctionComponent, Props } from 'react';
import { StyleSheet, ScrollView, View,  Text, FlatList, Image, Dimensions} from 'react-native';
import { NavigationScreenProp, NavigationScreenComponent } from 'react-navigation'
import axios from 'axios';


const Article: NavigationScreenComponent<Props> = ({ navigation }) => {
  const [article, setArticle] = useState(undefined);
  const { id } = navigation.state.params;

  const fetchArticle = async () => {
    const { data } = await axios.get(`http://localhost:8081/?id=${id}`);
    setArticle(data[0]);    
  }

  useEffect(() => {
    fetchArticle();
  }, []);
  
  if(article === undefined) {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }
  
  return (
    <ScrollView>
      <Image style={styles.topImage} source={{uri: article.image}}/>
      <FlatList
        data={article.category}
        renderItem={({ item }) => <Text style={styles.quote}>{item.name}</Text>}
      />
      <Text>{article.author}</Text>
      <Text>{article.title}</Text>
      <FlatList
        data={article.body.elements}
        renderItem={({ item }) => buildArticle(item)}
      />
    </ScrollView>
  );
}

const buildArticle = (element) => {
  const { type } = element;
  switch (type) {
    case 'paragraph':
      return ( 
        <FlatList
          data={element.content}
          renderItem={({ item }) => buildParagraph(item)}
        />
      );
      break;
    case 'image':
      return (
        <> 
          <Image style={styles.image} source={{uri: element.src}}/>
          <Text>{element.caption}</Text>
        </>
      );
      break;
    case 'quote':
      return (
        <FlatList
          data={element.content}
          renderItem={({ item }) => <Text style={styles.quote}>{item}</Text>}
        />
      );
      break;
    case 'header':
      return <Text h1>{element.text}</Text>
      break;
    default:
      break;
  }
}

const buildParagraph = (content) => {
  if(content.hasOwnProperty('text')) {
    if (content.hasOwnProperty('modifiers')) {
      let mod = {};
      content.modifiers.forEach((modifier) => {
        if(modifier === 'strong') {
          mod = {...mod, fontWeight: 'bold'}
        } 
        if(modifier === 'em') {
          mod = {...mod, fontStyle: 'italic'}
        }
      })
      return <Text style={mod}>{content.text}</Text>
    }
    return <Text>{content.text}</Text>;
  }
  if(content.hasOwnProperty('linebreak')) {
    return <Text>{'\n'}</Text>;
  }
}

const { width, height } = Dimensions.get('window'); //full width
const ratio = width/300;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    width: width,
    height: 222 * width/300,
    resizeMode: 'cover'
  },
  image: {
    width: width,
    height: 222 * width/300,
    resizeMode: 'center',
    paddingHorizontal: 10
  },
  quote: {
    color: 'red'
  }
});



Article.navigationOptions = {
  title: "Article"
}

Article.path = "article";

export default Article;
