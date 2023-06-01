import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoStore } from '../todo.store';
import { take } from 'rxjs';

@Component({
  selector: 'tl-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.scss'],
})
export class TodoEditorComponent {
  todoText$ = this.todoStore.todoText$;

  editTodoForm: FormGroup;

  constructor(private readonly todoStore: TodoStore) {
    const editItem = new FormControl('', Validators.required);
    this.editTodoForm = new FormGroup({ editItem });
    this.todoStore
      .select((state) => state.todoText)
      .pipe(take(1))
      .subscribe((newText) => editItem.setValue(newText));
  }

  onCancelEdit = () => this.todoStore.updateEditMode(false);
  onFormSubmit() {
    const formControl = this.editTodoForm.controls['editItem'];
    if (!formControl || formControl.value === '') {
      return;
    }
    this.todoStore.updateTodoText(formControl.value);
    this.todoStore.updateEditMode(false);
  }
}
