import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodolistStore } from '../todolist.store';
import { TodoItem } from './todo-item';
import { combineLatest, map, tap } from 'rxjs';

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

  constructor(private readonly todolistStore: TodolistStore) {
    super(defaultState);
  }

  readonly initItem = super.updater((state, newItem: TodoItem) => ({
    ...state,
    id: newItem.id,
    isChecked: newItem.isChecked,
    todoText: newItem.todoText,
  }));

  readonly updateChecked = super.updater((state, isChecked: boolean) => ({
    ...state,
    isChecked,
  }));

  readonly updateEditMode = super.updater((state, isEditMode: boolean) => ({
    ...state,
    isEditMode,
  }));

  readonly updateTodoText = super.updater((state, todoText: string) => ({
    ...state,
    todoText,
  }));

  private updateTodoInDb = super.effect(() =>
    combineLatest([this.id$, this.todoText$, this.isChecked$]).pipe(
      tap(([id, todoText, isChecked]) =>
        this.todolistStore.updateItemById({
          id,
          todoText,
          isChecked,
        })
      )
    )
  );

  readonly deleteItem = () => this.todolistStore.deleteItemById(this.id$);
}
