import React from 'react';
import { Text, Image, ImageBackground, View } from 'react-native';
import buildParagraph from './buildParagraph';
import { ParagraphChildType, ImageType } from '../types'
import ImageLoader from '../components/ImageLoader';
import styles from '../styles/styles';

const buildArticle = (element: any) => {
  const { type } = element;
  switch (type) {
    case "paragraph":
      return <Text style={styles.articleParagraph}>{element.content.map((content: ParagraphChildType, i: number) => buildParagraph(content, i))}
        </Text>
    case 'image':
      return <ImageLoader image={element}/>;
    case 'quote':
      return (
        <View style={styles.quoteContainer}>
          <Image style={styles.quoteBackground} source="https://www.gazzine.com/wp-content/themes/Total/assets/images/quote.png"/>
          <View style={styles.quoteTextContainer}>
            {element.content.map((content: string, i: number) => (
              <Text key={i} style={styles.quote}>
                {content}
              </Text>
            ))}
          </View>
      </View>
      )
    case 'header':
      return <Text>{element.text}</Text>
    case 'imageGallery':
      return element.images.map((image:ImageType) => (
        <Image 
          key={image.imageId} 
          style={styles.articleImage} 
          source={{uri: image.src}}
        />))
    case 'listItem':
      return element.content.map((content: ParagraphChildType, i: number) => (
        <Text key={i}>
          *{content.text}
        </Text>
      ));
    default:
      break;
  }
}

export default buildArticle;
