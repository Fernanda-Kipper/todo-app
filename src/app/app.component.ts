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
  title: string = "";
  type: 'normal' | 'important' | 'medium' | 'light' = 'normal';

  constructor(private localStorageService: LocalStorageService<ToDo>){}

  ngOnInit(){
    this.todoList = this.localStorageService.getItem('todoList')
  }

  handleItemComplete(id: string){
    this.todoList = this.todoList.map(todo => {
      if(todo.id === id){
        return ({
          ...todo,
          isDone: !todo.isDone
        })
      }
      return todo
    })
    this.localStorageService.setItem('todoList', this.todoList)
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
