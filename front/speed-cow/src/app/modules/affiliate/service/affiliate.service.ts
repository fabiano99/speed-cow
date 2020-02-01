import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../api/config.api';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  constructor(private http: HttpClient) {}

  list(id?) {
    if (id) { return this.http.get(`${environment.host}:${environment.port}/affiliates/${id}`); }
    return this.http.get(`${environment.host}:${environment.port}/affiliates`);
  }

  save(document, id?) {
    if (id) { return this.http.patch(`${environment.host}:${environment.port}/affiliates/${id}`, document); }
    return this.http.post(`${environment.host}:${environment.port}/affiliates`, document);
  }

  delete(id) {
    return this.http.delete(`${environment.host}:${environment.port}/affiliates/${id}`);
  }

}
