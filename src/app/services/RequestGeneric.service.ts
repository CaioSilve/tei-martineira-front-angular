import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService<T> {

  apiURL = 'http://127.0.0.1:5007/';

  httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  request<T>(method, url, headers, body, params): Observable<T> {
    return this.httpClient.request<T>(method, this.apiURL + url, {
      body: body || {},
      headers: headers || {},
      params: params || {}
    })
  }

  public get(url, params?, headers?, data?): Observable<T> { 
    return this.request('get', url, this.httpOptions, null, params);
  }

  public post(url, body?, headers?, data?): Observable<T> { 
    return this.request('post', url, this.httpOptions, body, null);
  }
}
