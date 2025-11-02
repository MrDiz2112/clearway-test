import {Component, effect, inject, input, signal} from '@angular/core';
import {DocumentViewerComponent} from '../components/document-viewer/document-viewer.component';
import {DocumentStateService} from '../services/document-state.service';
import {DocumentAnnotationService} from '../services/document-annotation.service';

@Component({
  selector: 'app-document-page',
  imports: [
    DocumentViewerComponent
  ],
  templateUrl: './document-page.component.html',
  styleUrl: './document-page.component.scss',
})
export class DocumentPageComponent {
  private stateService = inject(DocumentStateService);
  private annotationService = inject(DocumentAnnotationService);

  imgDocumentId = input.required<string>();

  protected readonly imgDocument = this.stateService.currentImgDocument.asReadonly();
  protected readonly imgDocumentStatus = this.stateService.currentDocumentStatus;

  protected scale = signal(0.5);

  constructor() {
    effect(() => {
      this.stateService.setCurrentImgDocumentId(this.imgDocumentId());
    });

    effect(() => {
      this.annotationService.loadAnnotations(this.imgDocumentId());
    });
  }

  protected saveAnnotations() {
    this.annotationService.saveAnnotations(this.imgDocumentId());
  }

  protected scaleUp() {
    this.scale.update(s => {
      const newScale = s + 0.25;

      if (newScale > 2) {
        return s;
      }

      return newScale;
    });
  }

  protected scaleDown() {
    this.scale.update(s => {
      const newScale = s - 0.25;

      if (newScale <= 0) {
        return s;
      }

      return newScale;
    });
  }
}
