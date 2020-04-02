import React from 'react';
import { Text, Image, View } from 'react-native';
import buildParagraph from './buildParagraph';
import { ParagraphChildType, ImageType } from '../types'
import ImageLoader from '../components/ImageLoader';
import QuoteBuilder from '../components/QuoteBuilder';
import styles from '../styles/styles';
import ParagraphBuilder from '../components/ParagraphBuilder';

const buildArticle = (element: any) => {
  const { type } = element;
  switch (type) {
    case "paragraph":
      return <ParagraphBuilder paragraph={element}/>;
    case 'image':
      return <ImageLoader image={element}/>;
    case 'quote':
      return <QuoteBuilder quote={element}/>
    case 'header':
      return <Text>{element.text}</Text>
    case 'imageGallery':
      return <ImageLoader image={element.images[0]}/>;
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
