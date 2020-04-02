import React, { FunctionComponent} from 'react';
import { View,  Text, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Article, Category, Author } from '../types'
import styles from '../styles/styles';

interface Props {
  article: Article;
  navigation: NavigationStackProp;
}

const Card: FunctionComponent<Props> = ( props ) => {
  const { article, navigation } = props;
  
  const onPress = (): void => { navigation.navigate('Article', { slug: article.slug }) };

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={onPress}>
      <ImageBackground style={styles.cardBackgroundImage} source={{ uri: article.image}}>
        <View style={styles.cardCategoryBox}>
          {article.category.map((cat: Category) => 
            <Text key={cat.id} style={styles.cardCategory} >{cat.name}</Text>
          )}
        </View>
        <View style={styles.cardDescription}>
          <Text>
            <Text style={styles.cardTitle}>{article.title} </Text>
            <Text style={styles.cardModified}>{article.modified}</Text>
          </Text>
          <View style={styles.cardAuthors}>{article.authors.map((author: Author) => 
              <Text key={author.id} style={styles.cardAuthor}>{author.name}</Text>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Card;