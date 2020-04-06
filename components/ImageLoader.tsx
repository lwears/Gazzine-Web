import React, { useState, useEffect, FunctionComponent } from 'react';
import {
  Image, Text, Dimensions, View,
} from 'react-native';
import styles from '../styles/styles';
import { ImageType } from '../types';

interface Props {
  image: ImageType;
}

const ImageLoader: FunctionComponent<Props> = ({ image }) => {
  const [imageWidth, setImageWidth] = useState<number>(undefined);
  const [imageHeight, setImageHeight] = useState<number>(undefined);

  const { width } = Dimensions.get('window');

  useEffect(() => {
    Image.getSize(image.src, (imgWidth, height) => {
      setImageWidth(imgWidth);
      setImageHeight(height);
    }, () => {});
  }, []);

  if (!width) {
    return <Text>Loading image</Text>;
  }

  return (
    <View>
      <Image
        style={{
          width,
          height: imageHeight * (width / imageWidth),
          resizeMode: 'contain',
        }}
        source={{ uri: image.src }}
      />
      <Text style={styles.articleImageCaption}>{image.caption}</Text>
    </View>
  );
};

export default ImageLoader;
