import React from 'react';
import ImageLoader from '../components/ImageLoader';
import QuoteBuilder from '../components/QuoteBuilder';
import ParagraphBuilder from '../components/ParagraphBuilder';
import HeaderBuilder from '../components/HeaderBuilder';
import ListItemBuilder from '../components/ListItemBuilder';

const buildArticle = (element: any) => {
  const { type } = element;
  switch (type) {
    case "paragraph":
      return <ParagraphBuilder paragraph={element}/>;
    case 'image':
      return <ImageLoader image={element}/>;
    case 'quote':
      return <QuoteBuilder quote={element}/>;
    case 'header':
      return <HeaderBuilder header={element} />;
    case 'imageGallery':
      return <ImageLoader image={element.images[0]}/>;
    case 'listItem':
      return <ListItemBuilder listItem={element}/>;
    default:
      break;
  }
}

export default buildArticle;
