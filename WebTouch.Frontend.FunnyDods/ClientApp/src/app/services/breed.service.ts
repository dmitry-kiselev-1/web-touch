import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable()
export class BreedService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
    this.apiRoutePrefix = '/breeds/list/all';
  }

  getList(): Observable<object>
  {
    return this.httpClient.get<HttpResponse<object>>(
      `${this.apiDomain}${this.apiRoutePrefix}`,
      {
        //headers: this.httpOptions.headers,
        observe: 'response'
      });
  }

}
