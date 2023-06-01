import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './api/services/todo/todo.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [TodoService],
})
export class ApiModule {}
