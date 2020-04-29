import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LmshttpService {

  constructor(private http: HttpClient) { }

  getAll(url){
    return this.http.get(url);
  }

  postObj(url, obj) {
    return this.http.post(url, obj);
  }

  putObj(url, obj) {
    return this.http.put(url, obj);
  }

  delete(url){
    return this.http.delete(url);
  }
}

