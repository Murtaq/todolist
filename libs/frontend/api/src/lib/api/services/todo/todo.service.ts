import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { TodoItem } from '../../models/todo/todo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TodoService extends BaseService<TodoItem> {
  override path = 'todos';

  constructor(protected override readonly http: HttpClient) {
    super();
  }

  createByString(todoText: string): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}/${this.path}`, todoText);
  }
}
