import { Component, OnInit } from '@angular/core';

//class
//import {todomodel} from "./todomodel.interface";

import {Todomodel} from "./todomodel";

//service
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'SeanTodoList'; // title of my app
  // when a task is being edited  
  edited = false;
  // initialize sample todo
  tasks = new Todomodel(0,'',false);

  // this array will always store list of todos retrieved from server
  taskslist:  Todomodel []=[];
  filter: string;

  //injecting the dataservice from
  constructor (private dataservice: TodoService) {
  }

  // submitting the form 
  onSubmit() {      
    this.saveTodo(this.tasks);
    // resetting the mytodo value
    this.tasks = new Todomodel(0,'',false);
    
  }

  saveTodo(tasks: Todomodel){
    // if it is not an editing
    if (!this.edited) {
      if (this.tasks.taskTitle=='') return;
      // saving new todo
        this.dataservice.createTodo(tasks).subscribe(data=> {
        // this.displayTodoList();
      });
    }
    // if we are editing an existing todo
    else {
      this.edited=false;
      console.log('this is being edited',tasks);
            // update existing todo
      this.dataservice.updateTodo(this.tasks.id,this.tasks).subscribe(data =>
        {     
          //this.displayTodoList();
        }       
        );
    }    
  }

  // get toatal number of tasks
  getTotal = function(){
    return this.taskslist.length; 
  };

  // total number of remaining to do's
  remaining(): number {
    return this.taskslist.filter(tasks => tasks.completed).length;
  }

  //if 1 is completed
  atLeastOneCompleted(): boolean {
    return this.taskslist.filter(tasks => tasks.completed).length > 0;
  }

  //clear the completed tasks from list
  clearCompleted(id): void {
    this.taskslist = this.taskslist.filter(tasks => !tasks.completed);
  }


  ngOnInit(){
    this.displayTodoList();
  }
  //this function retrieves the whole array of todos from server, using api service injected
  displayTodoList() {
    this.dataservice.getTodoList().subscribe(data =>
      {
        // as the Web Api doesn't sort the list of todos, we do here in the frontend
        this.taskslist = data.sort((a,b)=> {
          if (a.id>b.id) return -1;
          if (a.id<b.id) return 1;
        });
        console.log('display task', this.taskslist);
      });
  }

    //deleting an existing todo
    FuncDelete(id: number) { // without type info
      console.log('delete', id);    
      this.dataservice.deleteTodo(id).subscribe();
    }

    //editing an existing todo
    FuncEdit(eid: number) { // without type info
      console.log('editing',eid);
      this.tasks = this.taskslist.filter(x=>x.id ==eid)[0];
      this.edited = true;   
    }

 

    //finalizing(crossing) an existing todo
    FinishTodo(doneId: number) { // without type info
    // console.log('finishing', eid);   
    const taskfinished = this.taskslist.filter(task=>task.id == doneId )[0];
    taskfinished.completed =  !taskfinished.completed ;
    //calling the update observable
    this.dataservice.updateTodo(doneId,taskfinished).subscribe();  
  }
  

}// end of class
