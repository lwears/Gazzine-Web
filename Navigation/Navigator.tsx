import { createStackNavigator } from 'react-navigation-stack';
import { createBrowserApp } from '@react-navigation/web';
import ArticleList from '../screens/ArticleList';
import Article from '../screens/Article';

const Navigator = createStackNavigator(
  {
    Article: { screen: Article, path: ':slug' },
    ArticleList: { screen: ArticleList, path: '' },
  },
  {
    headerMode: 'none',
  },
);

const Container = createBrowserApp(Navigator);

export default Container;
