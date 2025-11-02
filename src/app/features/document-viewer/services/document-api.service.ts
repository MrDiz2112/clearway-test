import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImgDocument} from '../models/img-document';

@Injectable({
  providedIn: 'root',
})
export class DocumentApiService {
  private http = inject(HttpClient);

  getDocumentById(id: string) {
    return this.http.get<ImgDocument>(`/mocks/${id}.json`);
  }
}
