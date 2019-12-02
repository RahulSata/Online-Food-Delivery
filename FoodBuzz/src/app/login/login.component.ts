import { Component, OnInit } from '@angular/core';
import {LogService} from '../log.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private loglogService: LogService,private cookie : CookieService) {
   }

  ngOnInit() {
  }

  logout(){

  }
  dat:String;
  onClickSubmit1(user){
      this.loglogService.validateUser(user).subscribe((data:any) => {this.dat= data["red"];
      if(this.dat=="login")
      {  window.alert("Invalid Username or password");
           this.router.navigate([this.dat]);
      }
      else{
        this.cookie.set('sessionID', data['sessionID']);
        this.router.navigate(['/home',{username:user.username}]);
      }
    })
    }
}