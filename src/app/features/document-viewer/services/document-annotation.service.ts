import {Injectable, signal} from '@angular/core';
import {Annotation} from '../models/annotation';
import {AnnotationsCache} from '../models/annotations-cache';

@Injectable({
  providedIn: 'root',
})
export class DocumentAnnotationService {
  private readonly STORAGE_KEY = 'annotations';

  private cache: AnnotationsCache = {};

  private _annotations = signal<Annotation[]>([]);

  annotations = this._annotations.asReadonly();

  loadAnnotations(documentName: string) {
    try {
      const rawCache = sessionStorage.getItem(this.STORAGE_KEY);
      let annotationsForDocument: Annotation[] = [];

      if (!rawCache) {
        return;
      }

      this.cache = JSON.parse(rawCache) as AnnotationsCache;
      annotationsForDocument = this.cache[documentName] || [];

      this._annotations.set(annotationsForDocument);
    } catch (error) {
      console.error(`Failed to load annotations from session storage for document ${documentName}`, error);
      this._annotations.set([]);
    }
  }

  saveAnnotations(documentName: string) {
    console.table(this._annotations());

    this.cache[documentName] = this._annotations();

    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cache));
  }

  createAnnotation(annotation: Annotation) {
    this._annotations.update(prev => [...prev, annotation]);
  }

  updateAnnotation(updated: Annotation) {
    this._annotations.update(prev => prev.map(annotation => annotation.id === updated.id ? updated : annotation));
  }

  deleteAnnotation(deleted: Annotation) {
    this._annotations.update(prev => prev.filter(annotation => annotation.id !== deleted.id));
  }
}
