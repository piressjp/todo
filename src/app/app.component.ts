import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      title: ['', Validators.compose([  
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list'
  }

  load() {
    const data = localStorage.getItem('todos');

    this.todos = data ? JSON.parse(data) : [];
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo){
    todo.done = true;
  }

  markAsUndone(todo: Todo){
    todo.done = false;
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}