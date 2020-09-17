import { Component, OnInit , Input} from '@angular/core';
//import { HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';    
import { Http, Response,Headers } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
import {ActivatedRoute } from '@angular/router';
import {Router } from '@angular/router';

import { Task } from '../model/task.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input()
  task: Task[];

  constructor(private router: Router,private route: ActivatedRoute, private http: Http) { }
  id:number;
  data:object={};
  taskObj: object={};
  tasks=[];

  
  private headers = new Headers ({'Content-Type': 'application/json'});
  //tasks=[];
  fetchData=function(){
    this.http.get("http://localhost:9999/tasks").subscribe(
      (res: Response)=>{
        this.tasks= res.json();
      }
    )
   }

   deleteTask=function(id){
    if(confirm("Are you sure to delete Task?")){
      const url = `${"http://localhost:9999/tasks"}/${id}`;
      return this.http.delete(url,{headers:this.headers}).toPromise()
      .then(() =>{
        this.fetchData();
      })
    }
   }

   confirmationString:string="New Task has been added";
   isAdded:boolean=false;
  // taskObj:object={};
 
 addNewTask = function(tasks){
   this.taskObj={
     "taskTitle":tasks.taskTitle,
     "taskDesc": tasks.taskDesc
   }
   this.http.post("http://localhost:9999/tasks/", this.taskObj).subscribe(
     (res:Response)=>{
     console.log(res);
     this.isAdded=true;
   })
 
 }

 getTotal = function(){
  return this.tasks.length;
  
};

getDone = function() {
 return this.tasks.length;
};


 ngOnInit() {
   this.fetchData();
   
 }

   checks=false;
   bulk(e){
     if(e.target.checked==true){
       this.checks=true;
     }else{
       this.checks=false;
     }
   }

   
  




}
