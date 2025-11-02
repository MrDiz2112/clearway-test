import {Component, input} from '@angular/core';
import {ImgPage} from '../../models/img-page';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-img-page',
  templateUrl: './img-page.component.html',
  styleUrl: './img-page.component.scss',
})
export class ImgPageComponent {
  imgPage = input.required<ImgPage>();
}
