import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { AppService } from './app.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  task = '';
  todos: Todo[] = [];
  loading = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.appService.getList().subscribe(
      (response: Todo[]) => {
        this.todos = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  updateTodoWithDelay(e: CheckboxChangeEvent, todo: Todo) {
    this.loading = true;
    setTimeout(() => {
      this.appService.updateTodo({ ...todo, completed: e.checked }).subscribe(
        response => {
          console.log(response);
          this.getList();
          this.loading = false;
        },
        error => {
          console.error('Error updating todo:', error);
          this.loading = false;
        }
      );
    }, 2000); 
  }

  deleteTodoWithDelay(e: unknown, id: Todo['id']) {
    this.loading = true;
    setTimeout(() => {
      this.appService.deleteTodo(id).subscribe(
        response => {
          this.getList();
          this.loading = false;
        },
        error => {
          console.error('Error deleting todo:', error);
          this.loading = false;
        }
      );
    }, 2000); 
  }

 async addTodoWithDelay()  {
    this.loading = true;
 
    await this.appService.addTodo({ task: this.task, completed: false }).subscribe(
        response => {
          console.log(response)
          this.getList();
          this.loading = false;
        },
        error => {
          console.error('Error adding todo:', error);
          this.loading = false;
        }
      );

  }
}


