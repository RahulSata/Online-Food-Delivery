import { Component, OnInit } from '@angular/core';
import {SessionService} from '../session.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'FoodBuzz';
  welcome = 'Account';
  login: Boolean = false;

  constructor(private session : SessionService,private router:Router,private cookie:CookieService) { }
  public user;
  ngOnInit() {
      this.session.getUser().subscribe(data => {
        console.log(data);
        this.populateUser(data['user']);
      });
    this.session.getSession({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
      if (data['status']) {
        this.welcome = data['session'].userName;
        this.login = true;
        this.populateUser(data['user']);
      } else {
        this.welcome = 'Account';
        this.login = false;
        this.router.navigate(['/login']);
        console.log("NAAA");
      }
    });
  }

  populateUser(data){
    this.user = data;
  }
  logoff() {
    console.log(this.cookie.get('sessionID'));
    this.session.destroySession({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
    });
    this.router.navigate(['/login']);
    this.ngOnInit();
  }

}
