// import { ImageUriType } from './mappers/findImageUri';

export interface ImageUriType {
  uri: string;
  width: number;
  height: number;
}

export type IDType = {
  readonly id: number;
};

export interface Author extends IDType {
  coAuthorTermId: number;
  name: string;
  profilePictureUrl?: string;
  description?: string;
  bylineType?: string;
  bylineTypeText?: string;
}

export interface Category extends IDType {
  name: string;
}

export type Resource = 'users' | 'categories';

export interface ResourceItem extends IDType {
  name: string;
  profilePictureUrl?: string;
  coAuthorTermId?: number;
}

// there must be a TS WP definition somewhere!?
export interface Article extends IDType {
  link: string;
  title: string;
  modified: Date;
  modifiedGMT: Date;
  image: ImageUriType;
  body: string;
  authors: Array<Author>;
  categories: Array<Category>;
}

export interface ImageMap {
  [key: number]: ImageUriType;
}

export type QueryType<T extends IDType, K extends string> = { [key in K]: Array<T> };
export type QueryPrefixType = '' | '&' | '?';

export type DataFetcher<T extends IDType, F extends IDType = IDType, K extends string = string> = (
  page: number,
  query?: QueryType<F, K>,
) => Promise<Array<T>>;
export type DataMapper<T extends IDType> = (data: any) => T;

export enum ReferrerType {
  external = 'external',
  internal = 'internal',
  list = 'list',
  authorList = 'authorList',
  strossle = 'strossle',
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
