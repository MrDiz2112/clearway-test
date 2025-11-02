import {Component, computed, DestroyRef, effect, ElementRef, inject, input, output, signal} from '@angular/core';
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
    '[style.left.%]': 'positionLeft()',
    '[style.top.%]': 'positionTop()',
  },
})
export class AnnotationComponent {
  private elementRef = inject(ElementRef<HTMLElement>);

  annotation = input.required<Annotation>();

  updated = output<Annotation>();
  delete = output<Annotation>();

  protected state = signal<AnnotationState>(AnnotationState.Idle);

  protected positionLeft = computed(() => this.annotation().coordinates.x * 100);
  protected positionTop = computed(() => this.annotation().coordinates.y * 100);

  protected AnnotationState = AnnotationState;

  constructor() {}

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
