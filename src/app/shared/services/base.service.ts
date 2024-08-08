import {
  catchError,
  delayWhen,
  map,
  mergeMap,
  retryWhen,
  takeWhile
} from 'rxjs/operators';

import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { EndpointFeatureParams } from '../interfaces/feature-toggle.interface';
import { getLogin } from '../../login/selectors/login.selector';
import { RefreshTokenRequest } from '../../login/actions/login.actions';
import { State } from '../../login/reducers';
import { Urls } from './../interfaces/urls.interface';

@Injectable()
export class BaseService {

  protected clientId: string;
  protected grantType: string;
  protected clientSecret: string;
  protected urls: Urls;
  public retryCount = 0;
  public setDelay = 2500;

  constructor(
    protected http: HttpClient
  ) {
    this.clientId = environment.clientId;
    this.grantType = environment.grantType;
    this.clientSecret = environment.clientSecret;
    this.urls = environment.urls;
  }

  public retryWhenCallback(error$) {

    return error$.pipe(
      mergeMap((error: HttpErrorResponse) => {

        if (error.status === 504) {
          if (this.retryCount === 4) {
            this.retryCount = 0;
            return throwError(error);
          }

          this.retryCount++;
          return of(error.status);
        }

        return throwError(error);
      }),
      delayWhen(() => timer(this.setDelay)),
      takeWhile((value: any) => {
        if (value === 401 || (value === 504 && this.retryCount <= 4) || (value === 422 && this.retryCount <= 4)) {
          return true;
        }

        return false;
      })
    );
  }

  /**
   * Request method get
   * @param endpoint: Endpoint for request
   * @param path: Path for request
   * @param params: Params for request
   * @return Observable
   */
  public get(
    endpoint: string,
    path: string,
    queryString = {},
    headers = {},
    feature: string | EndpointFeatureParams = null
  ): Observable<any> {
    const endpointResolved = this.feature.endpointResolver(feature, `${this.urls[endpoint]}${path}`);

    return this.http.get(endpointResolved, { params: queryString, headers: headers }).pipe(
      map((response: HttpResponse<Object>) => response),
      retryWhen(error$ => this.retryWhenCallback(error$)),
      catchError(error => throwError(error))
    );
  }

  /**
   * Request method post
   * @param endpoint: Endpoint for request
   * @param path: Path for request
   * @param params: Params for request
   * @return Observable
   */
  public post(
    endpoint: string,
    path: string,
    params: Object = {},
    headers = {},
    feature: string | EndpointFeatureParams = null
  ): Observable<any> {
    const endpointResolved = this.feature.endpointResolver(feature, `${this.urls[endpoint]}${path}`);

    return this.http.post(endpointResolved, params, { headers }).pipe(
      map((response: HttpResponse<Object>) => response),
      retryWhen(error$ => this.retryWhenCallback(error$)),
      catchError(error => throwError(error))
    );
  }

  /**
   * Request method delete
   * @param endpoint: Endpoint for request
   * @param path: Path for request
   * @param params: Params for request
   * @return Observable
   */
  public delete(endpoint: string, path: string, queryString = {}, body?: object): Observable<any> {
    const options = {
      body,
      params: queryString ? queryString : {}
    };
    return this.http.delete(`${this.urls[endpoint]}${path}`, options).pipe(
      map((response: HttpResponse<Object>) => response),
      retryWhen(error$ => this.retryWhenCallback(error$)),
      catchError(error => throwError(error))
    );
  }

  /**
   * Request method put
   * @param endpoint: Endpoint for request
   * @param path: Path for request
   * @param params: Params for request
   * @return Observable
   */
  public put(endpoint: string, path: string, params: Object = {}, headers = {}): Observable<any> {
    return this.http.put(`${this.urls[endpoint]}${path}`, params, { headers: headers }).pipe(
      map((response: HttpResponse<Object>) => response),
      retryWhen(error$ => this.retryWhenCallback(error$)),
      catchError(error => throwError(error))
    );
  }

  /**
   * Request method patch
   * @param endpoint: Endpoint for request
   * @param path: Path for request
   * @param params: Params for request
   * @return Observable
   */
  public patch(endpoint: string, path: string, params: Object = {}): Observable<any> {
    return this.http.patch(`${this.urls[endpoint]}${path}`, params).pipe(
      map((response: HttpResponse<Object>) => response),
      retryWhen(error$ => this.retryWhenCallback(error$)),
      catchError(error => throwError(error))
    );
  }
}
