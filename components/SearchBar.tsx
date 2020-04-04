import React, { FunctionComponent } from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/styles';

interface Props {
  search: Function;
}

const SearchBar: FunctionComponent<Props> = (props) => {
  const { search } = props
  return (
    <View style={styles.searchBar}>
      <TextInput placeholder={'Search'} 
      onSubmitEditing={(event) => search(event.nativeEvent.text)}
      />
    </View>
  );
};

export default SearchBar;