import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 11,
    textAlign: 'center',
    marginVertical: 5,
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
  articleContainer: {
    padding: 10,
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
    marginTop:20,
    marginBottom: 15,
  },
  articleParagraph: {
    marginVertical: 7,
    lineHeight: 20,
    fontFamily: 'roboto-regular',
  },
  quote: {
    color: '#aaa',
  },
  quoteBackground: {
    height: 29*0.6,
    width: 31*0.6,
    resizeMode: 'contain',
    marginRight: 15
  },
  quoteContainer: {
    flexDirection: 'row',
  },
  quoteTextContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1,
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
    fontFamily: 'roboto-regular',
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
    borderColor: '#bbb',
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 3,
    fontFamily: 'roboto-regular',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontFamily: 'roboto-regular',
  },
  cardModified: {
    fontFamily: 'roboto-regular',
    whiteSpace: 'nowrap'
  },
  articleHeader: {
    fontWeight: 'bold',
    marginVertical: 7,
  },
  articleH1:{
    fontSize: 32,
  },
  articleH2:{
    fontSize: 24,
  },
  articleH3:{
    fontSize: 19,
  },
  articleH4:{
    fontSize: 16,
  },
  articleH5:{
    fontSize: 13,
  },
  articleH6:{
    fontSize: 11,
  },
  listContainer: {
    flexDirection: 'row',
  },
  listItem: {
    lineHeight: 20,
  },
  listItemBullet: {
    marginRight: 5,
  },
  searchBarInput: {
    flexGrow: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  searchBar: {
    flexDirection: "row",
    margin: 9,
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  searchBarSearch: {
    height: 20,
    width: 20,
  },
  searchBarCancel: {
    height: 20,
    width: 20,
  },
  loading: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default styles;