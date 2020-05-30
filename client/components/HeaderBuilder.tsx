import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import { HeaderType } from '../types';
import styles from '../styles/styles';

interface Props {
  header: HeaderType;
}

const HeaderBuilder: FunctionComponent<Props> = ({ header }) => {
  const headerStyle = `articleH${header.size}`;
  return <Text style={[styles[headerStyle], styles.articleHeader]}>{header.text}</Text>;
};

export default HeaderBuilder;
