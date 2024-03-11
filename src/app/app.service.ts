import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    [x: string]: any;
  updateTodoWithDelay(arg0: { completed: any; id?: string; task: string; }) {
    throw new Error('Method not implemented.');
  }

  baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {

   }

   getList() {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos` );
   }

   addTodo(postData: Todo) {
    return this.http.post (`${this.baseUrl}/todos`, postData);
   }

   updateTodo(postData: Todo) {
    return this.http.patch(`${this.baseUrl}/todos/${postData.id}`, postData);
   }

   deleteTodo(id: Todo['id']) {
    console.log(id)
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
   }
   
}
