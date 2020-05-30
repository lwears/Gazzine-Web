import React, { FunctionComponent } from 'react';
import {
  Text, View, ScrollView, Animated, Dimensions,
} from 'react-native';
import styles from '../styles/styles';
import ImageLoader from './ImageLoader';
import { ImageGalleryType } from '../types';

interface Props {
  element: ImageGalleryType;
}

const { width } = Dimensions.get('window');

const ImageGalleryBuilder: FunctionComponent<Props> = ({ element }) => {
  const { images, caption } = element;
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);
  return (
    <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        )}
        scrollEventThrottle={16}
      >
        {images.map((image) => <ImageLoader key={image.imageId} image={image} />)}
      </ScrollView>
      <View style={styles.imageGalleryDotsContainer}>
        {images.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[{ opacity }, styles.imageGalleryDots]}
            />
          );
        })}
      </View>
      { caption
        ? <Text style={styles.articleImageCaption}>{caption}</Text>
        : <></>}
    </View>
  );
};

export default ImageGalleryBuilder;
