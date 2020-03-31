import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    width: width,
    height: 222 * width/300,
    resizeMode: 'cover'
  },
  image: {
    width: width,
    height: 222 * width/300,
    resizeMode: 'center',
    paddingHorizontal: 10
  },
  quote: {
    color: 'red'
  }
});

export default styles;