import React, { FunctionComponent }from 'react';
import { Text, Linking } from 'react-native';
import { ParagraphChildType, ParagraphType } from '../types';
import styles from '../styles/styles';

interface modTypes {
  fontWeight?: 'bold';
  fontStyle?: 'italic';
}

interface Props {
  paragraph: ParagraphType;
}

const ParagraphBuilder: FunctionComponent<Props> = ({ paragraph }) => {
  const { content } = paragraph;
  return (
    <Text style={styles.articleParagraph}>
      {content.map((content: ParagraphChildType, i: number) => {
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
            return <Text key={i} style={mod} onPress={() => Linking.openURL(content.href)}>{content.text}</Text>;
          }
          return <Text key={i} style={mod}>{content.text}</Text>;
        }
        if(content.hasOwnProperty('linebreak')) {
          return <Text key={i} >{'\n'}</Text>;
        }
      })}
    </Text>
  )
}

export default ParagraphBuilder;
