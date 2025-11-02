import {Coordinates} from './coordinates';

export interface Annotation {
  id: number;
  pageNumber: number;
  text: string;
  /**
   * Относительные координаты для страницы
   */
  coordinates: Coordinates;
}
