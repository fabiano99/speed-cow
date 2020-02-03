import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../api/config.api';
import {AffiliateService} from '../../affiliate/service/affiliate.service';
import {BreedService} from '../../breed/service/breed.service';

@Injectable({
  providedIn: 'root'
})
export class CowService {

  constructor(
    private http: HttpClient,
    private breedService: BreedService,
    private affiliateService: AffiliateService
  ) {}

  list(id?, affiliate?) {
    if (affiliate) return this.http.get(`${environment.host}:${environment.port}/cows/affiliate/${affiliate}`);
    if (id) { return this.http.get(`${environment.host}:${environment.port}/cows/${id}`); }
    return this.http.get(`${environment.host}:${environment.port}/cows`);
  }

  save(document, id?) {
    if (id) { return this.http.patch(`${environment.host}:${environment.port}/cows/${id}`, document); }
    return this.http.post(`${environment.host}:${environment.port}/cows`, document);
  }

  delete(id) {
    return this.http.delete(`${environment.host}:${environment.port}/cows/${id}`);
  }

  loadBreeds() {
    return this.breedService.list();
  }

  loadAffiliates() {
    return this.affiliateService.list();
  }
}
