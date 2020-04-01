import React from 'react';
import { Text, Linking } from 'react-native';
import { ParagraphChildType } from '../types';
import styles from '../styles/styles';

interface modTypes {
  fontWeight?: 'bold';
  fontStyle?: 'italic';
}

const buildParagraph = (content: ParagraphChildType, key: number) => {
  if(content.hasOwnProperty('text')) {
    const mod: modTypes = {};
    if (content.hasOwnProperty('modifiers')) {
      content.modifiers.forEach((modifier) => {
        if(modifier === 'strong') {
          mod.fontWeight = 'bold';
        } 
        if(modifier === 'em') {
          mod.fontStyle = 'italic';
        }
      })
    } 
    if (content.hasOwnProperty('href')) {
      return <Text key={key} style={[mod, styles.articleParagraph]} onPress={() => Linking.openURL(content.href)}>{content.text}</Text>;
    }
    return <Text key={key} style={[mod, styles.articleParagraph]}>{content.text}</Text>;
  }
  if(content.hasOwnProperty('linebreak')) {
    return <Text key={key} >{'\n'}</Text>;
  }
}

export default buildParagraph;