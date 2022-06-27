import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() title: string= '';
  @Input() type: string = 'normal';
  @Input() isDone: boolean = false;
  @Input() id: string = '';

  @Output() onDelete = new EventEmitter();
  @Output() onComplete = new EventEmitter();
  @Output() onIncomplete = new EventEmitter();

  handleClickCheck(){
    if(!this.isDone) this.onComplete.emit(this.id)
    else this.onIncomplete.emit(this.id)
  }

  handleClickDelete(){
    this.onDelete.emit(this.id)
  }
}
