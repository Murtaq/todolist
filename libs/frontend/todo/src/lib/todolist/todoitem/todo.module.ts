import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TodoEditorComponent } from './todo-editor/todo-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { TodoDisplayComponent } from './todo-item/todo-display.component';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [TodoComponent, TodoDisplayComponent, TodoEditorComponent],
  exports: [TodoComponent],
  providers: [],
})
export class TodoModule {}
