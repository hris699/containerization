import { Component, OnInit } from '@angular/core';
import { ListUserService } from 'src/app/services/list-user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  user :any =[]
  constructor(private listService:ListUserService) { 
    
    this.listService.getUserData().subscribe(data=>{
      this.user =data
    })
  }
   
  ngOnInit(): void {
  }
    
}
