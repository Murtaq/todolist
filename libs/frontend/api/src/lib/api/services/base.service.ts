import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from '../models/base.model';
import { environment } from 'environments/environment';

export abstract class BaseService<T extends BaseModel> {
  protected apiUrl: string = environment.apiUrl;
  protected abstract path: string;
  protected abstract http: HttpClient;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.path}`);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.path}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.path}`, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${this.path}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${this.path}/${id}`);
  }
}
