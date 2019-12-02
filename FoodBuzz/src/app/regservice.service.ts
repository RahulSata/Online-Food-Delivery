import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegserviceService {

  constructor(private http:HttpClient) { }

  registerUser(user)
  {
    this.http.post('http://localhost:3000/userlogin/users/adduser',user).subscribe(
      res=>{console.log(res);
      })
  }
}
