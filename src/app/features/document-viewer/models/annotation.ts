import {Coordinates} from './coordinates';

export interface Annotation {
  id: number;
  documentName: string;
  pageNumber: number;
  text: string;
  coordinates: Coordinates;
}
