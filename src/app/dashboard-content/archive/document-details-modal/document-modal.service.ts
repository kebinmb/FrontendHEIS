import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentModalService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor() { }

  generateUrls(filenames: string[]): string[] {
    return filenames.map(filename => `${this.apiServerUrl}/archives/${filename}`);
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
