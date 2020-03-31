import React from 'react';
import { Text, FlatList, Image, Dimensions } from 'react-native';
import buildParagraph from './buildParagraph';
import { ElementType, Category, Author, ParagraphChildType, ImageType } from '../types'
import styles from '../styles/styles';

const buildArticle = (element: any) => {
  const { type } = element;
  switch (type) {
    case "paragraph":
      return element.content.map((content: ParagraphChildType, i: number) => buildParagraph(content, i));
    case 'image':
      return (
        <> 
          <Image style={styles.image} source={{uri: element.src}}/>
          <Text>{element.caption}</Text>
        </>
      );
    case 'quote':
      return element.content
        .map((content: string, i: number) => (
          <Text key={i} style={styles.quote}>
            {content}
          </Text>
        ));
    case 'header':
      return <Text>{element.text}</Text>
    case 'imageGallery':
      return element.images.map((image:ImageType) => (
        <Image 
          key={image.imageId} 
          style={styles.image} 
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
