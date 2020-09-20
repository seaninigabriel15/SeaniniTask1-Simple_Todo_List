import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todomodel } from './todomodel';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiURL = 'http://localhost:9999'; // ito ung json file natin running sa json server
  
  constructor(private http: HttpClient) { }

  //Content Type ( na acceptable lang ay si json)
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
  }  


  // HttpClient API get() method => Fetch todos list
  getTodoList(): Observable<Todomodel[]> {
    return this.http.get<Todomodel[]>(this.apiURL + '/tasks')
  }

  // HttpClient API get() method => Fetch specific task
  getTodo(id): Observable<Todomodel> {
    return this.http.get<Todomodel>(this.apiURL + '/tasks/' + id)
  }  

  // HttpClient API post() method => Create todo
  createTodo(tasks): Observable<Todomodel> {
    console.log('trying to save', JSON.stringify(tasks));
    return this.http.post<Todomodel>(this.apiURL + '/tasks', JSON.stringify(tasks), this.httpOptions)
  }  

  // HttpClient API put() method => Update todo
  updateTodo(id, tasks): Observable<Todomodel> {
    console.log('trying to update',id, tasks);
    return this.http.put<Todomodel>(this.apiURL + '/tasks/' + id, JSON.stringify(tasks), this.httpOptions)
  }

  // HttpClient API delete() method => Delete todo
  deleteTodo(id){
    return this.http.delete<Todomodel>(this.apiURL + '/tasks/' + id, this.httpOptions)
    
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}
