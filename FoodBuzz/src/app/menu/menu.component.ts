import { Component, OnInit } from '@angular/core';
import {ItemlistService} from '../itemlist.service';
import {LogService} from '../log.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 // private products  = [];
  private myData: any[] = [];
  private mydata;
  userId=""; 
  constructor(private router:Router,private itemlistService: ItemlistService,private loglogService:LogService,private cookie: CookieService) { }
  private productsObservable : Observable<any[]> ;
  ngOnInit() {
        this.getitemsss();
}

getitemsss():void{
  this.itemlistService.get_items()
    .subscribe(
      res => {
      this.mydata = res; 
      // Where you find the array res.data or res.data.data
      console.log('res is ', res);
      });
}
onClickSubmit2(restorent){
  console.log(restorent.rest_name);
  this.itemlistService.getitemsssss(restorent).
  subscribe(
    res=>{
      this.mydata=res;
      console.log('res is ',res);
    }
  );
}

public count1(index: number):void{
  //console.log("Infsjf");
  console.log(this.mydata[index].item_count);
  this.mydata[index].item_count += 1;
 }
 public count2(index: number):void{
   this.mydata[index].item_count -= 1;
   if(this.mydata[index].item_count<0){
     this.mydata[index].item_count = 0;
 } 
 }
private id: any[] = [];

public logout():void{
    this.loglogService.logout();
}

 public select(index: number):void{  
   //console.log(this.mydata[index].item);
   this.itemlistService.addcart({
   item_name: this.mydata[index].item
}).subscribe(data => {
   if(data['status']){
   console.log('hello');
   console.log(data);
     }
  });
 } 
}
