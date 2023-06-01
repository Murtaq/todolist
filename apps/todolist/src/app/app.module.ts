import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodolistModule } from '@todolist/frontend/todo';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, HttpClientModule, TodolistModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
