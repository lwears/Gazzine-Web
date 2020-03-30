import React, { useState, useEffect, FunctionComponent, Props } from 'react';
import { StyleSheet, ScrollView, View,  Text, FlatList, Image, Dimensions, Linking} from 'react-native';
// import { NavigationScreenProp, NavigationScreenComponent } from 'react-navigation'
import axios from 'axios';

const Article = ({ navigation, route }) => {
  
  const [article, setArticle] = useState(undefined);
  const { routeName } = navigation.state;
  
  const fetchArticle = async () => {
    if(routeName === 'Article') {
      const { id } = navigation.state.params;
      const { data } = await axios.get(`http://localhost:8081/?id=${id}`);
      setArticle(data);
      
      window.history.replaceState('object or string', 'Title', `/${data.slug}`);
    } else {
      const { slug } = navigation.state.params;
      const { data } = await axios.get(`http://localhost:8081/?slug=${slug}`);
      setArticle(data);
    }
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
        renderItem={({ item }) => <Text style={styles.quote}>{item.name}</Text>}
        keyExtractor={item => item.id.toString()}
      />
      <Text>{article.authors[0].name}</Text>
      <Image style={styles.image} source={{ uri: article.authors[0].profilePictureUrl}} />
      <Text>{article.title}</Text>
      <FlatList
        data={article.body.elements}
        renderItem={({ item }) => buildArticle(item)}
        keyExtractor={(item, i) => i.toString()}
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
          keyExtractor={(item, i) => i.toString()}
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
          keyExtractor={(item, i) => i.toString()}
        />
      );
      break;
    case 'header':
      return <Text>{element.text}</Text>
      break;
    case 'imageGallery':
      return (
        <FlatList
        data={element.images}
        renderItem={({ item }) => <Image style={styles.image} source={{uri: item.src}}/>}
        keyExtractor={(item) => item.imageId.toString()}
      />
      )
      break;
    case 'listItem':
      return (
        <FlatList
        data={element.content}
        renderItem={({ item }) => <Text>*{item.text}</Text>}
        keyExtractor={(item, i) => i.toString()}
      />
      )
      break;
    default:
      break;
  }
}

const buildParagraph = (content) => {
  if(content.hasOwnProperty('text')) {
    let mod = {};
    if (content.hasOwnProperty('modifiers')) {
      content.modifiers.forEach((modifier) => {
        if(modifier === 'strong') {
          mod = {...mod, fontWeight: 'bold'}
        } 
        if(modifier === 'em') {
          mod = {...mod, fontStyle: 'italic'}
        }
      })
      // return <Text style={mod}>{content.text}</Text>
    } 
    if (content.hasOwnProperty('href')) {
      return <Text style={mod} onPress={() => Linking.openURL(content.href)}>{content.text}</Text>;
    }
    return <Text style={mod}>{content.text}</Text>;
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

// Article.path = "";

export default Article;
