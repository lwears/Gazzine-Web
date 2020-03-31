import React, { useState, useEffect, FunctionComponent, Props } from 'react';
import { Text, FlatList, Image, Dimensions } from 'react-native';
import buildParagraph from './buildParagraph';
import styles from '../styles/styles';

const buildArticle = (element: any) => {
  const { type } = element;
  switch (type) {
    case 'paragraph':
      return ( 
        <FlatList
          data={element.content}
          renderItem={({ item }: { item: any }) => buildParagraph(item)}
          keyExtractor={(item: any, i: number) => i.toString()}
        />
      );
    case 'image':
      return (
        <> 
          <Image style={styles.image} source={{uri: element.src}}/>
          <Text>{element.caption}</Text>
        </>
      );
    case 'quote':
      return (
        <FlatList
          data={element.content}
          renderItem={({ item }: { item: any }) => <Text style={styles.quote}>{item}</Text>}
          keyExtractor={(item: any, i: number) => i.toString()}
        />
      );
    case 'header':
      return <Text>{element.text}</Text>
    case 'imageGallery':
      return (
        <FlatList
        data={element.images}
        renderItem={({ item }: { item: any }) => <Image style={styles.image} source={{uri: item.src}}/>}
        keyExtractor={(item: any) => item.imageId.toString()}
      />
      );
    case 'listItem':
      return (
        <FlatList
        data={element.content}
        renderItem={({ item }: { item: any}) => <Text>*{item.text}</Text>}
        keyExtractor={(item: any, i: number) => i.toString()}
      />
      );
    default:
      break;
  }
}

export default buildArticle;
