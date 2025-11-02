import {Component, computed, ElementRef, inject, input} from '@angular/core';
import {DocumentAnnotationService} from '../../services/document-annotation.service';
import {Annotation} from '../../models/annotation';
import {AnnotationComponent} from '../annotation/annotation.component';
import {Coordinates} from '../../models/coordinates';

@Component({
  selector: 'app-annotations-layer',
  imports: [
    AnnotationComponent
  ],
  templateUrl: './annotations-layer.component.html',
  styleUrl: './annotations-layer.component.scss',
  host: {
    '(dblclick)': 'createAnnotation($event)',
  },
})
export class AnnotationsLayerComponent {
  private service = inject(DocumentAnnotationService);
  private elementRef = inject(ElementRef<HTMLElement>);

  pageNumber = input.required<number>();

  protected annotationsForPage = computed(
    () => this.service.annotations()
      .filter(annotation => annotation.pageNumber === this.pageNumber())
  );

  protected createAnnotation(event: MouseEvent) {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    const relativeCoordinates: Coordinates = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };

    const newAnnotation: Annotation = {
      id: Date.now(),
      pageNumber: this.pageNumber(),
      text: 'Новая аннотация',
      coordinates: relativeCoordinates,
    };

    this.service.createAnnotation(newAnnotation);
  }

  protected updateAnnotation(annotation: Annotation) {
    this.service.updateAnnotation(annotation);
  }

  protected deleteAnnotation(annotation: Annotation) {
    this.service.deleteAnnotation(annotation);
  }
}
