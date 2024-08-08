import { BaseService } from './base.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { TestBed, inject, async } from '@angular/core/testing';
import { TestStore } from '@test/test-store';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { reducers } from '../../login/reducers';

describe('BaseService', () => {
  const baseUrl = environment.urls['vehicle'];

  let store: TestStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseService,
        { provide: Store, useClass: TestStore }
      ],
      imports: [
        StoreModule.forRoot(reducers, {}),
        HttpClientModule,
        HttpClientTestingModule,
      ]
    });

    store = TestBed.get(Store);

    store.setState({
      auth: {
        login: {
          loading: false
        }
      }
    });
  });

  it('should be created', inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));

  it('should retry request when response is 504',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockErrorResponse = {
          status: 504,
          statusText: 'Gateway Timeout',
          ok: false,
        };

        const retryWhenCallbackSpy = spyOn(service, 'retryWhenCallback').and.returnValue(of(true));

        service.post('vehicle', '/test').subscribe();

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'POST'
        });

        requestMock.flush(null, mockErrorResponse);

        expect(retryWhenCallbackSpy).toHaveBeenCalled();
  })));

  it('should make a POST request success',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 200,
          statusText: 'Ok',
          ok: true,
        };

        service.post('vehicle', '/test', { test: true }, { header: true }).subscribe(data => {
          expect(data).toBe(mockResponse);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'POST'
        });

        requestMock.flush(mockResponse);
  })));

  it('should make a POST falied request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 500,
          statusText: 'Error',
          ok: false,
        };

        service.post('vehicle', '/test', { id: 1 }).subscribe(() => {}, error => {
          expect(error.statusText).toBe(mockResponse.statusText);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'POST'
        });

        requestMock.flush(null, mockResponse);
  })));

  it('should make a GET success request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 200,
          statusText: 'Ok',
          ok: true,
        };

        service.get('vehicle', '/test').subscribe(data => {
          expect(data).toBe(mockResponse);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'GET'
        });

        requestMock.flush(mockResponse);
  })));

  it('should make a GET falied request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 500,
          statusText: 'Error',
          ok: false,
        };

        service.get('vehicle', '/test', { id: 1 }).subscribe(() => {}, error => {
          expect(error.statusText).toBe(mockResponse.statusText);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test?id=1`,
          method: 'GET'
        });

        requestMock.flush(null, mockResponse);
  })));

  it('should make a DELETE success request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 200,
          statusText: 'Ok',
          ok: true,
        };

        service.delete('vehicle', '/test', { id: 1 }).subscribe(data => {
          expect(data).toBe(mockResponse);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test?id=1`,
          method: 'DELETE'
        });

        requestMock.flush(mockResponse);
  })));

  it('should make a DELETE falied request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 500,
          statusText: 'Error',
          ok: false,
        };

        service.delete('vehicle', '/test', { id: 1 }).subscribe(data => {}, error => {
          expect(error.statusText).toBe(mockResponse.statusText);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test?id=1`,
          method: 'DELETE'
        });

        requestMock.flush(null, mockResponse);
  })));

  it('should make a PUT success request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 200,
          statusText: 'Ok',
          ok: true,
        };

        service.put('vehicle', '/test', { id: 1 }).subscribe(data => {
          expect(data).toBe(mockResponse);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'PUT'
        });

        requestMock.flush(mockResponse);
  })));

  it('should make a PUT falied request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 500,
          statusText: 'Error',
          ok: false,
        };

        service.put('vehicle', '/test').subscribe(() => {}, error => {
          expect(error.statusText).toBe(mockResponse.statusText);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'PUT'
        });

        requestMock.flush(null, mockResponse);
  })));

  it('should make a PATCH success request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 200,
          statusText: 'Ok',
          ok: true,
        };

        service.patch('vehicle', '/test', { id: 1 }).subscribe(data => {
          expect(data).toBe(mockResponse);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'PATCH'
        });

        requestMock.flush(mockResponse);
  })));

  it('should make a PATCH falied request',
    async(
      inject([
        HttpTestingController,
        BaseService
      ],
      (httpMock: HttpTestingController, service: BaseService) => {
        const mockResponse = {
          status: 500,
          statusText: 'Error',
          ok: false,
        };

        service.patch('vehicle', '/test').subscribe(() => {}, error => {
          expect(error.statusText).toBe(mockResponse.statusText);
        });

        const requestMock = httpMock.expectOne({
          url: `${baseUrl}/test`,
          method: 'PATCH'
        });

        requestMock.flush(null, mockResponse);
  })));
});
