import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import axios from 'axios';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import baseUrl from '../vars';
import { Article } from '../types';

const ArticleList: NavigationStackScreenComponent = ({ navigation }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<number>(undefined);
  const [author, setAuthor] = useState<number>(undefined);
  const [moreArticles, setMoreArticles] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(undefined);

  const resetState = () => {
    setPage(1);
    setMoreArticles(true);
    setArticles([]);
  };

  const updateCategory = (id: number) => {
    if (id === category) {
      setCategory(undefined);
    } else {
      setCategory(id);
      setAuthor(undefined);
      setSearch(undefined);
    }
    resetState();
  };

  const updateAuthor = (id: number) => {
    if (id === author) {
      setAuthor(undefined);
    } else {
      setAuthor(id);
      setCategory(undefined);
      setSearch(undefined);
    }
    resetState();
  };

  const updateSearch = (searchQuery: string) => {
    if (searchQuery === search) {
      setSearch(undefined);
    } else {
      setSearch(searchQuery);
      setAuthor(undefined);
      setCategory(undefined);
    }
    resetState();
  };

  const updateArticles = async (pageNr: number) => {
    try {
      const { data } = await axios.get(`${baseUrl}?type=AllPosts&page=${pageNr}`);
      setArticles([...articles, ...data]);
    } catch (err) {
      setMoreArticles(false);
    }
  };

  const fetchArticlesOnFilter = async (pageNr: number) => {
    if (search) {
      try {
        const { data } = await axios.get(`${baseUrl}?type=Search&page=${pageNr}&search=${search}`);
        setArticles([...articles, ...data]);
      } catch (error) {
        setMoreArticles(false);
      }
    } else {
      const categoryValue = category || '';
      const authorValue = author || '';

      try {
        const { data } = await axios.get(`${baseUrl}?type=AllPosts&page=${pageNr}&category=${categoryValue}&author=${authorValue}`);
        setArticles([...articles, ...data]);
      } catch (err) {
        setMoreArticles(false);
      }
    }
  };

  const fetchMoreArticles = async () => {
    if (moreArticles) {
      if (category || author || search) {
        fetchArticlesOnFilter(page + 1);
        setPage(page + 1);
      } else {
        updateArticles(page + 1);
        setPage(page + 1);
      }
    }
  };

  useEffect(() => { updateArticles(1); }, []);

  useEffect(() => {
    fetchArticlesOnFilter(1);
  }, [category, author, search]);

  if (articles.length === 0) {
    return <Loading/>;
  }

  return (
    <>
      <SearchBar updateSearch={updateSearch} searchValue={search} />
      <FlatList
        data={articles}
        renderItem={({ item }: { item: Article }) => (
          <Card
            article={item}
            navigation={navigation}
            update={{ updateCategory, updateAuthor }}
          />
        )}
        keyExtractor={(item: Article) => item.id.toString()}
        onEndReached={fetchMoreArticles}
      />
    </>
  );
};

ArticleList.navigationOptions = {
  title: 'Articles',
  animationEnabled: false,
};

export default ArticleList;
