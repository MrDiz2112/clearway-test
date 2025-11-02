import {Component, computed, DestroyRef, ElementRef, inject, input, output, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Annotation} from '../../models/annotation';
import {FormsModule} from '@angular/forms';

enum AnnotationState {
  Idle,
  Hover,
  Editing,
}

@Component({
  selector: 'app-annotation',
  imports: [
    FormsModule
  ],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'onHostClick($event)',
    '(dblclick)': 'onHostDoubleClick($event)',
    '[class.editing]': 'state() === AnnotationState.Editing',
    '[style.left.%]': 'positionLeft()',
    '[style.top.%]': 'positionTop()',
  },
})
export class AnnotationComponent {
  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef<HTMLElement>);
  private destroyRef = inject(DestroyRef);

  annotation = input.required<Annotation>();

  updated = output<Annotation>();
  delete = output<Annotation>();

  protected state = signal<AnnotationState>(AnnotationState.Idle);
  private isDragging = signal(false);

  protected positionLeft = computed(() => this.annotation().coordinates.x * 100);
  protected positionTop = computed(() => this.annotation().coordinates.y * 100);

  protected AnnotationState = AnnotationState;

  constructor() {
    const onMouseMove = (e: MouseEvent) => this.onMouseMove(e);
    const onMouseUp = () => this.onMouseUp();

    this.document.addEventListener('mousemove', onMouseMove);
    this.document.addEventListener('mouseup', onMouseUp);

    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('mousemove', onMouseMove);
      this.document.removeEventListener('mouseup', onMouseUp);
    });
  }

  protected onDragStart(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isDragging.set(true);
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.isDragging()) return;

    event.preventDefault();
    this.updatePosition(event);
  }

  private onMouseUp() {
    this.isDragging.set(false);
  }

  protected onHostClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.state() === AnnotationState.Hover || this.state() === AnnotationState.Idle) {
      this.state.set(AnnotationState.Editing);
    }
  }

  protected onHostDoubleClick(event: MouseEvent) {
    event.stopPropagation();
  }

  protected onMouseEnter() {
    if (this.state() === AnnotationState.Idle) {
      this.state.set(AnnotationState.Hover);
    }
  }

  protected onMouseLeave() {
    if (this.state() === AnnotationState.Hover) {
      this.state.set(AnnotationState.Idle);
    }
  }

  protected saveAnnotation() {
    this.state.set(AnnotationState.Idle);

    this.updateText(this.annotation().text);
  }

  protected updatePosition(event: MouseEvent) {
    const annotationLayerElement = this.elementRef.nativeElement.parentElement;

    if (!annotationLayerElement) return;

    const annotationLayerRect = annotationLayerElement.getBoundingClientRect();

    let newX = (event.clientX - annotationLayerRect.left) / annotationLayerRect.width;
    let newY = (event.clientY - annotationLayerRect.top) / annotationLayerRect.height;

    if (newX < 0) newX = 0;
    if (newX > 1) newX = 1;

    if (newY < 0) newY = 0;
    if (newY > 1) newY = 1;

    const newAnnotation: Annotation = {
      ...this.annotation(),
      coordinates: {
        x: newX,
        y: newY,
      }
    };

    this.updated.emit(newAnnotation);
  }

  protected updateText(text: string) {
    const newAnnotation: Annotation = {
      ...this.annotation(),
      text,
    };

    this.updated.emit(newAnnotation);
  }

  protected deleteAnnotation() {
    this.delete.emit(this.annotation());
  }
}
