import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TodoItem } from '@todolist/frontend/api';
import { TodoService } from '@todolist/frontend/api';
import { Observable, concatMap, take, tap } from 'rxjs';

interface TodolistState {
  todoItems: TodoItem[];
}

const defaultState: TodolistState = {
  todoItems: [],
};

@Injectable({ providedIn: 'root' })
export class TodolistStore extends ComponentStore<TodolistState> {
  readonly todoItems$ = this.select((state) => state.todoItems);

  constructor(private readonly todoApiService: TodoService) {
    super(defaultState);

    todoApiService
      .getAll()
      .pipe(
        take(1),
        tap((items) => this.initTodos(items))
      )
      .subscribe();
  }

  private readonly initTodos = this.updater((state, newTodos: TodoItem[]) => ({
    ...state,
    todoItems: newTodos,
  }));

  readonly itemAdded = this.updater((state, newItem: TodoItem) => ({
    ...state,
    todoItems: [...state.todoItems, newItem],
  }));

  readonly itemUpdated = super.updater((state, updatedItem: TodoItem) => ({
    ...state,
    todoItems: state.todoItems.map((oldItem) =>
      oldItem.id === updatedItem.id ? updatedItem : oldItem
    ),
  }));

  readonly itemDeleted = super.updater((state, deletedItem: number) => ({
    ...state,
    todoItems: state.todoItems.filter((item) => item.id !== deletedItem),
  }));

  readonly addItem = super.effect((newItemText$: Observable<string>) =>
    newItemText$.pipe(
      concatMap((todoText: string) =>
        this.todoApiService.createByString(todoText).pipe(
          tapResponse(
            (newItem) => this.itemAdded(newItem),
            (error: HttpErrorResponse) => console.log(error) // TODO: proper error handling
          )
        )
      )
    )
  );

  readonly deleteItem = super.effect((id$: Observable<number>) =>
    id$.pipe(
      concatMap((id: number) =>
        this.todoApiService.delete(id).pipe(
          tapResponse(
            () => this.itemDeleted(id),
            (error: HttpErrorResponse) => console.error(error) // TODO: proper error handling
          )
        )
      )
    )
  );
}
