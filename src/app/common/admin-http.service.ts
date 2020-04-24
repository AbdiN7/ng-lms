import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminHttpService {

  constructor(private http: HttpClient) { }

  getAll(url: string){
      return this.http.get(url);
  }
}
