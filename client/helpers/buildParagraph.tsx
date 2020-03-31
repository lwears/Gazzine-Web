import React from 'react';
import { Text, Linking } from 'react-native';


const buildParagraph = (content) => {
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
      return <Text style={mod} onPress={() => Linking.openURL(content.href)}>{content.text}</Text>;
    }
    return <Text style={mod}>{content.text}</Text>;
  }
  if(content.hasOwnProperty('linebreak')) {
    return <Text>{'\n'}</Text>;
  }
  
}

export default buildParagraph;