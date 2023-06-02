import { HttpClient } from '@angular/common/http';
import { Observable, concatMap, map, range, reduce } from 'rxjs';
import { BaseModel } from '../models/base.model';
import { UrlBuilder } from './url-builder';

export abstract class BaseService<T extends BaseModel> {
  protected abstract path: string;
  protected abstract http: HttpClient;

  protected baseUrl = () => new UrlBuilder().withEndpoint(this.path);
  protected baseUrlWithId = (id: number) =>
    this.baseUrl().withPathParam(`${id}`);

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl().build(), item);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrlWithId(id).build());
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(this.baseUrlWithId(id).build(), item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrlWithId(id).build());
  }

  count(): Observable<number> {
    return this.http.get<number>(this.baseUrl().withPathParam('count').build());
  }

  getPaginated(page: number, pageSize: number): Observable<T[]> {
    const requestUrl = this.baseUrl()
      .withQueryParam('page', page)
      .withQueryParam('size', pageSize)
      .build();
    console.log(requestUrl);
    return this.http.get<T[]>(requestUrl);
  }

  getAll(): Observable<T[]> {
    const pageSize = 50;
    return this.count().pipe(
      map((itemCount) => Math.ceil(itemCount / pageSize)),
      concatMap((requestCount) =>
        range(0, requestCount).pipe(
          concatMap((page) => this.getPaginated(page, pageSize)),
          reduce((acc, curr) => acc.concat(curr))
        )
      )
    );
  }
}
