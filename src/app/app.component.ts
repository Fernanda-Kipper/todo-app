import { Component } from '@angular/core';
import uniqid from 'uniqid';

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

export class AppComponent {
  isDone: boolean = true;
  todoList: ToDo[] = [];
  title: string = "";
  type: 'normal' | 'important' | 'medium' | 'light' = "normal";

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
  }

  handleItemDelete(id: string){
    this.todoList = this.todoList.filter(todo => todo.id != id)
  }

  handleSubmit(event: SubmitEvent){
    event.preventDefault()
    this.todoList.push({
      title: this.title,
      type: this.type,
      isDone: false,
      id: uniqid()
    })
  }
}
