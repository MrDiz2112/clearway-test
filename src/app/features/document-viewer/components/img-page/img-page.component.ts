import {Component, computed, inject, input} from '@angular/core';
import {ImgPage} from '../../models/img-page';
import {AnnotationsLayerComponent} from '../annotations-layer/annotations-layer.component';
import {API_URL} from '../../../../tokens/api-url.token';

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
  protected readonly apiUrl = inject(API_URL);

  protected imgSrc = computed(() => this.apiUrl + this.imgPage().imageUrl)
}
