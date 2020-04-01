import React, { useState, useEffect }from 'react';
import {Image, Text, Dimensions} from 'react-native';
import styles from '../styles/styles';

export default function ImageLoader({image}) {
  const [imageWidth, setImageWidth] = useState(undefined);
  const [imageHeight, setImageHeight] = useState(undefined);

  const { width } = Dimensions.get('window');
  
  useEffect(() => {
    Image.getSize(image.src, (width, height) => {
      setImageWidth(width)
      setImageHeight(height)
    }, () => {})
  }, [])

  if ( !width ) {
    return <Text>Loading image</Text>
  }

  return (
    <> 
      <Image style={{
        width: width,
        height: imageHeight * width/imageWidth,
        resizeMode: 'contain'}}
        source={{uri: image.src}}/>
      <Text style={styles.articleImageCaption}>{image.caption}</Text>
    </>
  )
}
