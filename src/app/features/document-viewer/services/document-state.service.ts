import {inject, Injectable, signal} from '@angular/core';
import {DocumentApiService} from './document-api.service';
import {ImgDocument, emptyImgDocument} from '../models/img-document';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DocumentStateService {
  private data = inject(DocumentApiService);

  private currentDocumentId = signal<string>('');

  private documentResource = rxResource<ImgDocument, string>({
    params: () => this.currentDocumentId(),
    stream: ({params}) => this.data.getDocumentById(params),
    defaultValue: emptyImgDocument,
  })

  currentImgDocument = this.documentResource.value;
  currentDocumentStatus = this.documentResource.status;

  setCurrentImgDocumentId(id: string) {
    this.currentDocumentId.set(id);
  }
}
