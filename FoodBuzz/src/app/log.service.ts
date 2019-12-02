import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http:HttpClient) { }

  public validateUser(user):Observable<any>
  {console.log(user);
   return this.http.post<String>('http://localhost:3000/authenticate',user)
  }

  logout(){
    console.log("service");
    return this.http.get('http://localhost:3000/logout');
  }
}
