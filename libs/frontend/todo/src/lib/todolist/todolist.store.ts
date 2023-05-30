import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TodoItem } from './todoitem/todo-item';

interface TodolistState {
  todoItems: TodoItem[];
  idCounter: number;
}

const defaultState: TodolistState = {
  idCounter: 4,
  todoItems: [
    { id: 1, todoText: 'This is the first test item', isChecked: false },
    { id: 2, todoText: 'This is the second item', isChecked: false },
    { id: 3, todoText: 'This is the third one', isChecked: false },
  ],
};

@Injectable({ providedIn: 'root' })
export class TodolistStore extends ComponentStore<TodolistState> {
  readonly $todoItems = this.select((state) => state.todoItems);

  constructor() {
    super(defaultState);
  }

  readonly updateItemById = (item: TodoItem) => {
    //TODO: REST calls
  };

  // this.updater((state, newItem: TodoItem) => ({
  //   ...state,
  //   todoItems: state.todoItems.map((oldItem) =>
  //     oldItem.id === newItem.id ? newItem : oldItem
  //   ),
  // }));

  // replace with REST Call
  readonly deleteItemById = this.updater((state, toDelete: number) => ({
    ...state,
    todoItems: state.todoItems.filter((item) => item.id !== toDelete),
  }));

  // replace with REST Call
  readonly addItem = this.updater((state, newValue: string) => ({
    ...state,
    idCounter: state.idCounter + 1,
    todoItems: [
      ...state.todoItems,
      { id: state.idCounter, todoText: newValue, isChecked: false },
    ],
  }));
}
