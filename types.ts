export type IDType = {
  readonly id: number;
};

export type NameType = {
  name: string;
}

export interface Author extends IDType, NameType {
  profilePictureUrl?: string;
}

export interface Category extends IDType, NameType {}

export interface Article extends IDType {
  slug: string;
  category: Array<Category>;
  modified: string; // This is a string for now, should we have a date instead?
  title: string;
  authors: Array<Author>;
  image: string;
}

export interface ArticleWithBody extends Article {
  body: ArticleBodyType;
}

export enum ElementIdentifierType {
  paragraph = 'paragraph',
  image = 'image',
  imageGallery = 'imageGallery',
  header = 'header',
  quote = 'quote',
  listItem = 'listItem',
  unknown = 'unknown',
}

export interface ElementBaseType {
  type: ElementIdentifierType;
  k?: string;
}

// Paragraph
export enum ModifierType {
  strong = 'strong',
  em = 'em',
}

export interface ParagraphChildType {
  text?: string;
  modifiers?: Array<ModifierType>;
  href?: string;
  linebreak?: boolean;
}

export interface ParagraphType extends ElementBaseType {
  content: Array<ParagraphChildType>;
}

export interface HeaderType extends ElementBaseType {
  size: number;
  text: string;
}

export interface QuoteType extends ElementBaseType {
  content: Array<string>;
}

export interface ImageType extends ElementBaseType {
  imageId: string;
  caption?: string;
  src?: string;
}

export interface ImageGalleryType extends ElementBaseType {
  images: Array<ImageType>;
  caption?: string;
}

export interface ListItemType extends ElementBaseType {
  first?: boolean;
  last?: boolean;
  content: Array<ParagraphChildType>;
}

export interface UnknownType extends ElementBaseType {}

export type ElementType = ParagraphType | ImageType | ImageGalleryType | HeaderType | QuoteType | ListItemType | UnknownType;

export interface ArticleBodyType {
  elements: Array<ElementType>;
}