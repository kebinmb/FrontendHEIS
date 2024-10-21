import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentModalService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  generateUrls(filenames: string[]): Observable<Blob>[] {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Return an array of Observables (for each file request)
    return filenames.map(filename => {
      const url = `${this.apiServerUrl}/archives/file/${filename}`;
      return this.http.get(url, { headers, responseType: 'blob' });
    });
  }

  parseFilenames(filenames: string | string[]): string[] {
    if (typeof filenames === 'string') {
      try {
        const parsed = JSON.parse(filenames);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (error) {
        return filenames.split(',').map(item => item.trim());
      }
    } else if (Array.isArray(filenames)) {
      return filenames;
    }
    return [];
  }
}
