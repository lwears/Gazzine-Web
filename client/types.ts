import { ImageSourcePropType } from 'react-native'

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
  image: ImageSourcePropType;
}