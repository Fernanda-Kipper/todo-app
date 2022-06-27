import { Component } from '@angular/core';

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
  todoList: ToDo[] = [{
    title: 'Lavar roupa',
    type: 'normal',
    isDone: false,
    id: '3334'
  }]

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
}
