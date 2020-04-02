import React, { FunctionComponent } from 'react';
import { Image, Text, View } from 'react-native';
import { QuoteType } from '../types';
import styles from '../styles/styles';

interface Props {
  quote: QuoteType;
}

const QuoteBuilder:  FunctionComponent<Props> = ({quote}) => {
  return (
    <View style={styles.quoteContainer}>
      <Image style={styles.quoteBackground} source={{ uri: "https://www.gazzine.com/wp-content/themes/Total/assets/images/quote.png" }}/>
      <View style={styles.quoteTextContainer}>
        {quote.content.map((content: string, i: number) => (
          <Text key={i} style={styles.quote}>
            {content}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default QuoteBuilder;