import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TodolistStore } from '../todolist.store';

class TextIsEmptyMatcher implements ErrorStateMatcher {
  private _isError = false;
  set isError(value: boolean) {
    this._isError = value;
  }
  isErrorState(control: FormControl<string> | null): boolean {
    return !!(control && control.value === '' && this._isError);
  }
}

@Component({
  selector: 'todolist-creator',
  templateUrl: './todo-creator.component.html',
  styleUrls: ['./todo-creator.component.scss'],
})
export class TodoCreatorComponent {
  errorMatcher = new TextIsEmptyMatcher();

  newTodoForm = new FormGroup({
    newItem: new FormControl('', Validators.required),
  });

  constructor(private readonly todolistStore: TodolistStore) {}

  onFormSubmit() {
    const formControl = this.newTodoForm.controls.newItem;
    if (formControl.value === '') {
      this.errorMatcher.isError = true;
      return;
    }
    this.todolistStore.addItem(formControl.value || '');
    this.errorMatcher.isError = false;
    formControl.setValue('');
  }
}
