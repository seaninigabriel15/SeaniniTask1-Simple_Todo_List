import { Component, OnInit } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import {ActivatedRoute } from '@angular/router';
import {Router } from '@angular/router';
import {Observable} from 'rxjs';    


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  id: number;
  data:object={};
  taskObj: object={};
  tasks=[];
  private headers = new Headers ({'Content-Type': 'application/json'});
  
  constructor(private router: Router,private route: ActivatedRoute, private http: Http) { }

  updateTask(tasks){
    this.taskObj= {
      "taskTitle":tasks.taskTitle,
      "taskDesc":tasks.taskDesc
    };
    const url = `${"http://localhost:9999/tasks"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.taskObj),{headers:this.headers}).toPromise()
    .then(()=>{
    this.router.navigate(['/'])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    });
    this.http.get("http://localhost:9999/tasks").subscribe(
      (res: Response)=>{
        this.tasks= res.json();
        for (var i = 0; i< this.tasks.length;i++){
          if(parseInt(this.tasks[i].id)===this.id){
            this.data=this.tasks[i];
            break;
          }
        }
      }
    )
  }

}