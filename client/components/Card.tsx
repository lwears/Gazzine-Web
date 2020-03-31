import React, { FunctionComponent} from 'react';
import { StyleSheet, View,  Text, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Article } from '../types'

export interface Props {
  article: Article;
  navigation: NavigationStackProp<{ id: number}>;
}

const Card: FunctionComponent<Props> = ( props ) => {
  const { article, navigation } = props;
  const onPress = () => { navigation.navigate('Article', { slug: article.slug }) };

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

const { width } = Dimensions.get('window'); //full width

const styles = StyleSheet.create({
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

export default Card;