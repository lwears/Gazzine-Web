import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View,  Text, FlatList } from 'react-native';
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
    default:
      break;
  }
}

const buildParagraph = (content) => {
  if(content.hasOwnProperty('text')) {
    if (content.hasOwnProperty('modifiers')) {
      switch (content.modifiers[0]) {
        case 'strong':
          return <Text style={{fontWeight: 'bold'}}>{content.text}</Text>;
          break;
          case 'em':
            return <Text style={{fontStyle: 'italic'}}>{content.text}</Text>;
            break;
        default:
          return <Text>NO FUCKING MODIFIER</Text>;
          break;
      }
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
});

Article.navigationOptions = {
  title: "Article"
}

Article.path = "article";

export default Article;
