import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

export abstract class BaseService {

  protected apiRoutePrefix: string;

  constructor(
    protected apiDomain: string = 'https://dog.ceo/api',
    protected httpHeaders =
      new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest'
      })
  ) {
  }
}
