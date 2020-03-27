import { createStackNavigator } from 'react-navigation-stack';
import { createBrowserApp } from '@react-navigation/web';
import ArticleList from '../screens/ArticleList';

const Navigator = createStackNavigator(
  {
    ArticleList: ArticleList,
  },
  {
    headerMode: 'none',
  },
);

const Container = createBrowserApp(Navigator);

export default Container;