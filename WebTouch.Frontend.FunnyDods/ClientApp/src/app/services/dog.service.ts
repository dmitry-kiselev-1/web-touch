import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Dog } from '../models/dog';

@Injectable()
export class DogService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
    this.apiRoutePrefix = "/breed/"; // "/breed/akita/images/random"
  }

  private apiRoutePrefixEnd: string = "/images/random";

  getRandomDogByBreed(breed: string): Observable<object>
  {
    return this.httpClient.get<HttpResponse<object>>(
      `${this.apiDomain}${this.apiRoutePrefix}${breed}${this.apiRoutePrefixEnd}`,
      {
        //headers: this.httpOptions.headers,
        observe: 'response'
      });
  }

}
