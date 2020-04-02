import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { ListItemType, ParagraphChildType } from '../types';
import styles from '../styles/styles';

interface Props {
  listItem: ListItemType;
}

const ListItemBuilder: FunctionComponent<Props> = ({listItem}) => {
  return (
    <>
      {listItem.content.map((content: ParagraphChildType) => (
      <View key={listItem.k} style={styles.listContainer}>
        <Text style={styles.listItem}>•  </Text>
        <Text style={styles.listItem}>
          {content.text}
        </Text>
      </View>
      ))}
    </>
  );
}

export default ListItemBuilder;