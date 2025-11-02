import {inject, Injectable, signal} from '@angular/core';
import {Annotation} from '../models/annotation';
import {AnnotationsCache} from '../models/annotations-cache';
import {DocumentAnnotationStorageService} from './document-annotation-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentAnnotationService {
  private storage = inject(DocumentAnnotationStorageService);
  private _annotations = signal<Annotation[]>([]);

  annotations = this._annotations.asReadonly();

  loadAnnotations(documentName: string) {
    const annotationsForDocument = this.storage.getAnnotationsForDocument(documentName);

    this._annotations.set(annotationsForDocument);
  }

  saveAnnotations(documentName: string) {
    console.table(this._annotations());

    this.storage.saveAnnotationsForDocument(documentName, this._annotations());
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
