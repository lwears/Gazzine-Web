import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Item = ({article, navigation}) => {
  
  const onPress = () => {navigation.navigate('Article', { id: article.id })};
   
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{article.title.rendered}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ArticleList({ navigation }) {
  const [articles, setArticles] = useState(null);
  
  const updateArticles = async () => {
    const {data} = await axios.get('http://localhost:8080');
    setArticles(data);
  };
  
  useEffect(() => {
    
    updateArticles();
  }, []);
  
  if (articles === null) {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({item}) => <Item article={item} navigation={navigation} /> }
        keyExtractor={item => item.id.toString()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ArticleList.navigationOptions = {
  title: "Articles"
}

ArticleList.path = "";

export default ArticleList;
