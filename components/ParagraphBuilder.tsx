import React, { FunctionComponent } from 'react';
import { Text, Linking } from 'react-native';
import { ParagraphChildType, ParagraphType } from '../types';
import styles from '../styles/styles';

interface ModTypes {
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
      {content.map((item: ParagraphChildType, i: number): any => {
        if (item.hasOwnProperty('text')) {
          const mod: ModTypes = {};
          if (item.hasOwnProperty('modifiers')) {
            item.modifiers.forEach((modifier) => {
              if (modifier === 'strong') {
                mod.fontWeight = 'bold';
              }
              if (modifier === 'em') {
                mod.fontStyle = 'italic';
              }
            });
          }
          if (item.hasOwnProperty('href')) {
            return (
              <Text
                key={i}
                style={mod}
                onPress={() => Linking.openURL(item.href)}
              >
                {item.text}
              </Text>
            );
          }
          return (
            <Text
              key={i}
              style={mod}
            >
              {item.text}
            </Text>
          );
        }
        return <Text key={i}>{'\n'}</Text>;
      })}
    </Text>
  );
};

export default ParagraphBuilder;
