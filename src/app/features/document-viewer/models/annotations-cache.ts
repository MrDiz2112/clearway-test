import {Annotation} from './annotation';

export interface AnnotationsCache {
  [documentName: string]: Annotation[]
}
