import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl = 'https://random-word-api.herokuapp.com/word?number=100';

  constructor(private http: HttpClient) {}

  getItems(page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url);
  }

  
}
