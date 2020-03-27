import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View,  Text } from 'react-native';
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
      <Text dangerouslySetInnerHTML={{__html: article.body}}></Text>
    </ScrollView>
  );
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
