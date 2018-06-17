import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from './base-service';
import { Dog } from '../models/dog';
import { Breed } from '../models/breed';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable()
export class BreedService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
    this.apiRoutePrefix = '/breeds/list/all';
  }

  // Выполняет асинхронный запрос к веб-сервису
  getList(): Observable
  {
    debugger;
    return this.httpClient.get(
      this.apiDomain + this.apiRoutePrefix, this.httpHeaders);
  }

/*
  public getList(): Promise<Breed[]> {
    return this.http.get(
      this.apiDomain + this.apiRoutePrefix,
      this.requestOptions)
      .toPromise()
      .then(response => response.json().message as Breed[])
      .catch(error => Promise.reject(error));
  }
*/
}
