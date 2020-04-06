import React from 'react';
import ImageLoader from '../components/ImageLoader';
import QuoteBuilder from '../components/QuoteBuilder';
import HeaderBuilder from '../components/HeaderBuilder';
import ParagraphBuilder from '../components/ParagraphBuilder';
import ListItemBuilder from '../components/ListItemBuilder';
import ImageGalleryBuilder from '../components/ImageGalleryBuilder';

const buildArticle = (element: any) => {
  const { type } = element;
  switch (type) {
    case 'paragraph':
      return <ParagraphBuilder paragraph={element} />;
    case 'image':
      return <ImageLoader image={element} />;
    case 'quote':
      return <QuoteBuilder quote={element} />;
    case 'header':
      return <HeaderBuilder header={element} />;
    case 'imageGallery':
      return <ImageGalleryBuilder element={element} />;
    case 'listItem':
      return <ListItemBuilder listItem={element} />;
    default:
      break;
  }
};

export default buildArticle;
