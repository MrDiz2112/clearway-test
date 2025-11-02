import { Injectable } from '@angular/core';
import {Annotation} from '../models/annotation';
import {AnnotationsCache} from '../models/annotations-cache';

@Injectable({
  providedIn: 'root',
})
export class DocumentAnnotationStorageService {
  private readonly STORAGE_KEY = 'annotations';
  private storage = sessionStorage;

  private cache: AnnotationsCache = {};

  constructor() {
    this.getAnnotationsFromStorage();
  }

  private getAnnotationsFromStorage() {
    try {
      const rawCache = sessionStorage.getItem(this.STORAGE_KEY);

      if (!rawCache) {
        return;
      }

      this.cache = JSON.parse(rawCache) as AnnotationsCache;
    } catch (error) {
      console.error('Failed to load annotations from session storage', error);
      this.cache = {};
    }
  }


  getAnnotationsForDocument(documentName: string) {
    return this.cache[documentName] || [];
  }

  saveAnnotationsForDocument(documentName: string, annotations: Annotation[]) {
    this.cache[documentName] = annotations;

    try {
      this.storage.setItem(this.STORAGE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.error('Failed to save annotations to session storage', error);
    }
  }
}
