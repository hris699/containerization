import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListUserService {

  constructor(private http:HttpClient) { }
  getUserData()
  {
    let APIURL ="http://java-angular-604887724.us-east-2.elb.amazonaws.com:8585/users"
    return this.http.get(APIURL)
  }
  
}
