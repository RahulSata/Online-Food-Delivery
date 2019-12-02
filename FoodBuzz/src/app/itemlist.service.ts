import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ItemlistService {

  constructor(private http:HttpClient) { }

  public get_items():Observable<any[]>{
    return  this.http.get<any[]>('http://localhost:3000/menulist/list',{
      observe:'body',
    //withCredentials:true,
    headers:new HttpHeaders().append('Content-type','application/json')
    });
}

public addcart(user):Observable<any[]>{
  return this.http.post<any[]>('http://localhost:3000/add_to_cart',user,{
    observe:'body',
  //withCredentials:true,
  headers:new HttpHeaders().append('Content-type','application/json')
  });
}

public getitemsssss(restorent):Observable<any[]>{
  return this.http.post<any[]>('http://localhost:3000/menulist/itemlist',restorent,{
    observe:'body',
    headers:new HttpHeaders().append('Content-type','application/json')
  });
}
}
