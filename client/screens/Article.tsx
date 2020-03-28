import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View,  Text, FlatList, Image } from 'react-native';
import axios from 'axios';

function Article({ navigation }) {
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
      console.log('ImageLog', element.src); 
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
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
