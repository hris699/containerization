import { Component, OnInit } from '@angular/core';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  credentials = {
    name: ''
  }
  constructor(private registerService: AddUserService) { }

  ngOnInit(): void {

  }
  onSubmit() {
    console.log(this.credentials)
    this.registerService.UserRegister(this.credentials).subscribe((response: any) => {
      this.registerService.UserRegister(response.credentials)
    })
  }

}
