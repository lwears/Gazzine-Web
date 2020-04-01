import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: 'Roboto'
  },
  articleTopImage: {
    width: width,
    height: 222 * width/300,
    resizeMode: 'cover',
  },
  articleImage: {
    alignSelf: 'center',
    width: width,
    height: height,
    resizeMode: 'contain',
    padding: 10,
  },
  articleImageCaption: {
    color: 'gray',
  },
  articleCategories: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  articleCategory: {
    fontSize: 12,
    marginVertical: 4,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  articleAuthorContainer: {

  },
  articleAuthor: {
    left: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  articleAuthorImage: {
    width: 25,
    height: 25,
    borderRadius: 50
  },
  articleAuthorName: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop:20,
    marginBottom: 15,
  },
  articleParagraph: {
    marginHorizontal: 10,
    marginVertical: 7,
    fontFamily: 'Roboto'
  },
  quote: {
    color: 'red',
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
    flexDirection: 'row',
  },
  cardCategory: {
    marginLeft: 15,
  },
  cardDescription: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  cardAuthors: {
    flexDirection: 'row',
  },
  cardAuthor: {
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
  }
});

export default styles;