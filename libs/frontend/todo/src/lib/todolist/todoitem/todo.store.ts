import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TodolistStore } from '../todolist.store';
import { TodoItem, TodoService } from '@todolist/frontend/api';
import { Observable, concatMap, map, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface TodoState {
  id: number;
  isChecked: boolean;
  todoText: string;
  isEditMode: boolean;
}

const defaultState: TodoState = {
  id: -1,
  isChecked: false,
  todoText: '',
  isEditMode: false,
};

@Injectable({ providedIn: 'root' })
export class TodoStore extends ComponentStore<TodoState> {
  private id$ = super.select((state) => state.id);
  readonly todoText$ = super.select((state) => state.todoText);
  readonly isChecked$ = super.select((state) => state.isChecked);
  readonly isEditMode$ = super.select((state) => state.isEditMode);
  private readonly item$: Observable<TodoItem> = super.select((state) => ({
    id: state.id,
    isChecked: state.isChecked,
    todoText: state.todoText,
  }));

  constructor(
    private readonly todolistStore: TodolistStore,
    private readonly todoApiService: TodoService
  ) {
    super(defaultState);
  }

  readonly initItem = super.updater((state, newItem: TodoItem) => ({
    ...state,
    id: newItem.id,
    isChecked: newItem.isChecked,
    todoText: newItem.todoText,
  }));

  readonly updateEditMode = super.updater((state, isEditMode: boolean) => ({
    ...state,
    isEditMode,
  }));

  readonly updateLocalTodoText = super.updater((state, todoText: string) => ({
    ...state,
    todoText,
  }));

  readonly updateLocalChecked = super.updater((state, isChecked: boolean) => ({
    ...state,
    isChecked,
  }));

  readonly updateChecked = super.effect((newIsChecked$: Observable<boolean>) =>
    newIsChecked$.pipe(
      withLatestFrom(this.item$),
      map(([isChecked, item]) => ({ ...item, isChecked })),
      concatMap((item) =>
        this.todoApiService.update(item.id, item).pipe(
          tapResponse(
            () => {
              this.updateLocalChecked(item.isChecked);
              this.todolistStore.itemUpdated(item);
            },
            (error: HttpErrorResponse) => console.log(error) // TODO: proper error handling
          )
        )
      )
    )
  );

  readonly updateTodoText = super.effect((newTodoText$: Observable<string>) =>
    newTodoText$.pipe(
      withLatestFrom(this.item$),
      map(([newText, item]) => ({ ...item, todoText: newText })),
      concatMap((item) =>
        this.todoApiService.update(item.id, item).pipe(
          tapResponse(
            () => {
              this.updateLocalTodoText(item.todoText);
              this.todolistStore.itemUpdated(item);
            },
            (error: HttpErrorResponse) => console.log(error) // TODO: proper error handling
          )
        )
      )
    )
  );

  readonly deleteItem = () => this.todolistStore.deleteItem(this.id$);
}
