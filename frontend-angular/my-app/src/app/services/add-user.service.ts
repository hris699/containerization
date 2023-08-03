import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }
  //url = "http://localhost:8585/add"
url="http://java-angular-604887724.us-east-2.elb.amazonaws.com/add"
  UserRegister(credentials: any) {
    console.log("Hello",credentials)
    console.log("Before return",this.http.post(`${"http://java-angular-604887724.us-east-2.elb.amazonaws.com/add"}`, credentials))
    return this.http.post(`${"http://java-angular-604887724.us-east-2.elb.amazonaws.com/add"}`, credentials);
  }
}
