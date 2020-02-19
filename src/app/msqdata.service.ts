import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MsqdataService {
  
  //
  private url="assets/data.json";

  //
  constructor(private http: HttpClient) { }

  //
  getConfig() {
    return this.http.get(this.url);
  }

}

