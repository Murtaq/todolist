import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoModule } from './todolist/todoitem/todo.module';
import { TodoCreatorComponent } from './todolist/todo-creator/todo-creator.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TodoModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  declarations: [TodolistComponent, TodoCreatorComponent],
  exports: [TodolistComponent],
})
export class TodolistModule {}
