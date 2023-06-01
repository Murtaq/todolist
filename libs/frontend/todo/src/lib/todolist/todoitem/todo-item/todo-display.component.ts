import { Component } from '@angular/core';
import { TodoStore } from '../todo.store';

@Component({
  selector: 'tl-todo-display',
  templateUrl: './todo-display.component.html',
  styleUrls: ['./todo-display.component.scss'],
})
export class TodoDisplayComponent {
  todoText$ = this.todoStore.todoText$;
  isChecked$ = this.todoStore.isChecked$;

  constructor(private readonly todoStore: TodoStore) {}

  onChecked = (isChecked: boolean) => this.todoStore.updateChecked(isChecked);
  onEdit = () => this.todoStore.updateEditMode(true);
  onDelete = () => this.todoStore.deleteItem();
}
