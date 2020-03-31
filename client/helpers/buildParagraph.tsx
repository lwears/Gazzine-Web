import React from 'react';
import { Text, Linking } from 'react-native';


const buildParagraph = (content, key) => {
  if(content.hasOwnProperty('text')) {
    let mod = {};
    if (content.hasOwnProperty('modifiers')) {
      content.modifiers.forEach((modifier) => {
        if(modifier === 'strong') {
          mod = {...mod, fontWeight: 'bold'}
        } 
        if(modifier === 'em') {
          mod = {...mod, fontStyle: 'italic'}
        }
      })
    } 
    if (content.hasOwnProperty('href')) {
      return <Text key={key} style={mod} onPress={() => Linking.openURL(content.href)}>{content.text}</Text>;
    }
    return <Text key={key} style={mod}>{content.text}</Text>;
  }
  if(content.hasOwnProperty('linebreak')) {
    return <Text key={key} >{'\n'}</Text>;
  }
}

export default buildParagraph;