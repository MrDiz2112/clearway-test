import {Component, computed, input} from '@angular/core';
import {ImgDocument} from '../../models/img-document';
import {ImgPageComponent} from '../img-page/img-page.component';

@Component({
  selector: 'app-document-viewer',
  imports: [
    ImgPageComponent
  ],
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  host: {
    '[class.scaled-up]': 'isScaledUp()'
  }
})
export class DocumentViewerComponent {
  imgDocument = input.required<ImgDocument>();
  scale = input.required<number>();

  isScaledUp = computed(() => {
    return this.scale() > 1;
  });
}
