import {ImgPage} from './img-page';

export interface ImgDocument {
  name: string;
  pages: ImgPage[];
}

export const emptyImgDocument: ImgDocument = {
  name: '',
  pages: [],
}
