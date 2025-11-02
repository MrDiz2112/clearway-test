import {Component, input} from '@angular/core';
import {ImgPage} from '../../models/img-page';
import {AnnotationsLayerComponent} from '../annotations-layer/annotations-layer.component';

@Component({
  selector: 'app-img-page',
  templateUrl: './img-page.component.html',
  styleUrl: './img-page.component.scss',
  imports: [
    AnnotationsLayerComponent
  ]
})
export class ImgPageComponent {
  imgPage = input.required<ImgPage>();
}
