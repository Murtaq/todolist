import { Component } from '@angular/core';
import { TodoStore } from '../todo.store';

@Component({
  selector: 'todolist-todoitem',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  todoText$ = this.todoStore.todoText$;
  isChecked$ = this.todoStore.isChecked$;

  constructor(private readonly todoStore: TodoStore) {}

  onChecked = (isChecked: boolean) => this.todoStore.updateChecked(isChecked);
  onEdit = () => this.todoStore.updateEditMode(true);
  onDelete = () => this.todoStore.deleteItem();
}
