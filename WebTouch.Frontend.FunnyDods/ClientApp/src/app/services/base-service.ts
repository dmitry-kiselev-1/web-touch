import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
export abstract class BaseService {

  protected apiDomain: string = 'https://dog.ceo/api';
  protected apiRoutePrefix: string;

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest'
    })
  };

  constructor() {}
}
