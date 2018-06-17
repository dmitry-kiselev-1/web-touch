import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseService } from './base-service';
import { Dog } from '../models/dog';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DogService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
    this.apiRoutePrefix = '/api/product/';
  }
/*
  public get(id: string): Promise<Dog> {
    return this.httpClient.get(
      this.apiDomain + this.apiRoutePrefix + id,
      this.requestOptions)
      .toPromise()
      .then(response => response.json() as Dog)
      .catch(error => Promise.reject(error));
  }
*/
}
