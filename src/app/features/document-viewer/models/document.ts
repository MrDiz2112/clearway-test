import {Page} from './page';

export interface Document {
  name: string;
  pages: Page[];
}

export const emptyDocument: Document = {
  name: '',
  pages: [],
}
