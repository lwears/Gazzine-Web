import React, { FunctionComponent} from 'react';
import { View,  Text, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { Article, Category, Author } from '../types'
import styles from '../styles/styles';

interface Props {
  article: Article;
  navigation: NavigationStackProp;
  update: Updaters;
}

interface Updaters {
  updateCategory: Function;
  updateAuthor: Function;
}

const Card: FunctionComponent<Props> = ( props ) => {
  const { article, navigation, update: { updateCategory, updateAuthor } } = props;
  
  const onPress = (): void => { navigation.navigate('Article', { slug: article.slug }) };

  return (
    <TouchableOpacity style={styles.cardStyle} onPress={onPress}>
      <ImageBackground style={styles.cardBackgroundImage} source={{ uri: article.image}}>
        <View style={styles.cardCategoryBox}>
          {article.category.map((cat: Category) =>
          <TouchableOpacity key={cat.id} onPress={() => updateCategory(cat.id)}>
            <Text style={styles.cardCategory}>{cat.name}</Text>
          </TouchableOpacity>
          )}
        </View>
        <View style={styles.cardDescription}>
          <Text>
            <Text style={styles.cardTitle}>{article.title} </Text>
            <Text style={styles.cardModified}>{article.modified}</Text>
          </Text>
          <View style={styles.cardAuthors}>{article.authors.map((author: Author) =>
            <TouchableOpacity key={author.id} onPress={() => updateAuthor(author.id)}>
              <Text style={styles.cardAuthor}>{author.name}</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Card;