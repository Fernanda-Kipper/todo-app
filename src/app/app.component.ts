import { Component, OnInit } from '@angular/core';
import uniqid from 'uniqid';

import { LocalStorageService } from './local-storage.service';

interface ToDo {
  title: string;
  isDone: boolean;
  id: string;
  type: 'normal' | 'important' | 'medium' | 'light';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isDone: boolean = true;
  todoList: ToDo[] = [];
  completeList: ToDo[] = [];
  title: string = "";
  type: 'normal' | 'important' | 'medium' | 'light' = 'normal';

  constructor(private localStorageService: LocalStorageService<ToDo>){}

  ngOnInit(){
    this.todoList = this.localStorageService.getItem('todoList')
    this.completeList = this.localStorageService.getItem('completeList')
  }

  updateLocalStorage(){
    this.localStorageService.setItem('completeList', this.completeList)
    this.localStorageService.setItem('todoList', this.todoList)
  }

  handleItemComplete(id: string){
    let item = this.todoList.find(item => item.id === id)
    this.todoList = this.todoList.filter(item => item.id !== id)
    if(item){
      this.completeList = [{
        ...item,
        isDone: true
      }, ...this.completeList]
    }

    this.updateLocalStorage()
  }

  handleItemIncomplete(id: string){
    let item = this.completeList.find(item => item.id === id)
    this.completeList = this.completeList.filter(item => item.id !== id)
    if(item){
      this.todoList = [{
        ...item,
        isDone: false
      }, ...this.todoList]
    }

    this.updateLocalStorage()
  }

  handleItemDelete(id: string){
    this.todoList = this.todoList.filter(todo => todo.id != id)
    this.localStorageService.setItem('todoList', this.todoList)
  }

  resetForm(){
    this.type = 'normal'
    this.title = ''
  }

  handleSubmit(event: SubmitEvent){
    event.preventDefault()
    if(!this.title.trim().length) return
    this.todoList.push({
      title: this.title,
      type: this.type,
      isDone: false,
      id: uniqid()
    })
    this.localStorageService.setItem('todoList', this.todoList)
    this.resetForm()
  }
}
