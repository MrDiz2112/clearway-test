import {inject, Injectable, signal} from '@angular/core';
import {DocumentApiService} from './document-api.service';
import {Document, emptyDocument} from '../models/document';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DocumentStateService {
  private data = inject(DocumentApiService);

  private currentDocumentId = signal<string>('');

  private documentResource = rxResource<Document, string>({
    params: () => this.currentDocumentId(),
    stream: ({params}) => this.data.getDocumentById(params),
    defaultValue: emptyDocument,
  })

  currentDocument = this.documentResource.value;
  currentDocumentStatus = this.documentResource.status;
}
