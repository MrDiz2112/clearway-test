import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ImgDocument} from '../models/img-document';
import {catchError, delay, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentApiService {
  private http = inject(HttpClient);

  getDocumentById(id: string) {
    return this.http.get<ImgDocument>(`/mocks/${id}.json`).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || error.message || 'Failed to load document';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
