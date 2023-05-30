import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodolistModule } from '@todolist/frontend/todo';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TodolistModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
