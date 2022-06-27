import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() title: string= '';
  @Input() type: string = 'normal';
  @Input() isDone: boolean = false;
  @Input() id: string = '';

  onDelete = new EventEmitter();
  onComplete = new EventEmitter();

  handleClickCheck(){
    this.onComplete.emit(this.id)
  }

  handleClickDelete(){
    this.onDelete.emit(this.id)
  }

  constructor() {

  }

  ngOnInit(): void {
  }

}
