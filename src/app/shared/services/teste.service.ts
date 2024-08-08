import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TesteInterface } from '../../teste/teste.interface';
import { BaseService } from './base.service';

@Injectable()
export class TesteService extends BaseService {

  public getAddresssFromZipcode(teste: string): Observable<TesteInterface> {
    return this.get('teste', `/${teste}`).pipe(
      map(({ results }) => {
        return {
          teste: results.testeServico
        };
      })
    );
  }
}
