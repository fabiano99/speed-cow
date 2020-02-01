import { Affiliate } from './affiliate.model';
import { Breed } from './breed.model';

export interface Cow {
  _id: string;
  internalCode: string;
  affiliate: Affiliate;
  birthDate: Date;
  breed: Breed;
  __v: any;

}
