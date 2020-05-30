import React, { FunctionComponent } from 'react';
import {
  TextInput, View, Image, TouchableOpacity,
} from 'react-native';
import styles from '../styles/styles';

const ClearTextImg = require('../assets/times-circle-solid.svg');
const MagGlassImg = require('../assets/search-solid.svg');

interface Props {
  searchValue: string;
  updateSearch: Function;
}

const SearchBar: FunctionComponent<Props> = (props) => {
  const { searchValue, updateSearch } = props;

  return (
    <View style={styles.searchBar}>
      <Image
        style={styles.searchBarSearch}
        source={MagGlassImg}
      />
      <TextInput
        placeholder="Search..."
        style={styles.searchBarInput}
        defaultValue={searchValue}
        onSubmitEditing={(event) => updateSearch(event.nativeEvent.text)}
      />
      {
        searchValue
          ? (
            <TouchableOpacity onPress={() => updateSearch(undefined)}>
              <Image
                style={styles.searchBarCancel}
                source={ClearTextImg}
              />
            </TouchableOpacity>
          )
          : <></>
      }
    </View>
  );
};

export default SearchBar;
