import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  constructor(private http: HttpClient) {}

  list(id?) {
    if (id) { return this.http.get(`http://localhost:3000/affiliates/${id}`); }
    return this.http.get('http://localhost:3000/affiliates');
  }

  save(document, id?) {
    if (id) { return this.http.patch(`http://localhost:3000/affiliates/${id}`, document); }
    return this.http.post('http://localhost:3000/affiliates', document);
  }

  delete(id) {
    return this.http.delete(`http://localhost:3000/affiliates/${id}`);
  }

}
