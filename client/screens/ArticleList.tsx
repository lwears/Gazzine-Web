import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';

const Card = ({article, navigation}) => {
  
  const onPress = () => {navigation.navigate('Article', { id: article.id })};

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={onPress}>
      <ImageBackground style={styles.backgroundImage} source={article.image}>
        <View style={styles.categoryBox}>
          {article.category.map(cat => 
          <Text key={cat.id} style={styles.category} >{cat.name}</Text>
          )}
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>{article.title}</Text>
          <Text>{article.modified}</Text>
          <View style={styles.authors}>{article.authors.map((author) => 
            <Text key={author.id} style={styles.author}>{author.name}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function ArticleList({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  
  const updateArticles = async (pageNr) => {
    const {data} = await axios.get(`http://localhost:8080/?page=${pageNr}`);
    setArticles([...articles, ...data ]);
  };

  const fetchMoreArticles = async () => {
    updateArticles(page + 1);
    setPage(page + 1);
  };
  
  useEffect(() => {
    
    updateArticles(1);
  }, []);
  
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
      renderItem={({item}) => <Card article={item} navigation={navigation} /> }
      keyExtractor={item => item.id.toString()}
      onEndReached={fetchMoreArticles}
      />
  );
}

const { width } = Dimensions.get('window'); //full width


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    marginBottom: 5,
  },
  backgroundImage: {
    width: width,
    height: 222 * width/300,
  },
  categoryBox: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    borderBottomRightRadius: 3,
    paddingRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    flexDirection: 'row'
  },
  category: {
    marginLeft: 15
  },
  description: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10
  },
  authors: {
    flexDirection: 'row'
  },
  author: {
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 3
  },
  title: {
    fontWeight: 'bold',
  }
});

ArticleList.navigationOptions = {
  title: "Articles"
}

ArticleList.path = "";

export default ArticleList;
