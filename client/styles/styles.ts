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
  },
  cardStyle: {
    marginBottom: 5,
  },
  cardBackgroundImage: {
    width: width,
    height: 222 * width/300,
  },
  cardCategoryBox: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    borderBottomRightRadius: 3,
    paddingRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    flexDirection: 'row'
  },
  cardCategory: {
    marginLeft: 15
  },
  cardDescription: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10
  },
  cardAuthors: {
    flexDirection: 'row'
  },
  cardAuthor: {
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 3
  },
  cardTitle: {
    fontWeight: 'bold',
  }
});

export default styles;