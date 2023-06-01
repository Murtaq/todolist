import { Component } from '@angular/core';
import { TodolistStore } from './todolist.store';

@Component({
  selector: 'tl-list',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  providers: [TodolistStore],
})
export class TodolistComponent {
  todoItems$ = this.todolistStore.todoItems$;

  constructor(private readonly todolistStore: TodolistStore) {}
}
