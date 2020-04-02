import React, { useState, useEffect, FunctionComponent }from 'react';
import { Image, Text, Dimensions } from 'react-native';
import styles from '../styles/styles';
import { ImageType } from '../types';

interface Props {
  image: ImageType;
}

const ImageLoader: FunctionComponent<Props> = ({image}) => {
  const [imageWidth, setImageWidth] = useState<number>(undefined);
  const [imageHeight, setImageHeight] = useState<number>(undefined);

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

export default ImageLoader;