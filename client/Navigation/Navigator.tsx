import { createStackNavigator } from 'react-navigation-stack';
import { createBrowserApp } from '@react-navigation/web';
import ArticleList from '../screens/ArticleList';
import Article from '../screens/Article';

const Navigator = createStackNavigator(
  {
    ArticleList: ArticleList,
    Article: Article
  },
  {
    headerMode: 'none',
  },
);

const Container = createBrowserApp(Navigator);

export default Container;