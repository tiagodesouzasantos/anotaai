import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CardListResponseInterface } from '../interfaces/cardlist.interface';

@Injectable({
  providedIn: 'root'
})
export class CardlistService {

  constructor(
    protected http: HttpClient
  ) { }

  public getCardList(): Observable<CardListResponseInterface[]>{
    return this.http.get<CardListResponseInterface[]>(environment.urls.cardlist);
  }
}
