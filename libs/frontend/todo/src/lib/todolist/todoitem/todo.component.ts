import { Component, Input } from '@angular/core';
import { TodoItem } from './todo-item';
import { TodoStore } from './todo.store';

@Component({
  selector: 'todolist-item',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoStore],
})
export class TodoComponent {
  @Input() set todo(value: TodoItem) {
    this.todoStore.initItem(value);
  }

  isEditMode$ = this.todoStore.isEditMode$;

  constructor(private readonly todoStore: TodoStore) {}
}
