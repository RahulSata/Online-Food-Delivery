import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SessionService} from './session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodBuzz';
  welcome = 'Account';
  login: Boolean = false;

  constructor(private  session: SessionService,private router: Router,private cookie: CookieService){}

  ngOnInit() {
    this.session.getSession({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
      if (data['status']) {
        this.welcome = data['session'].userName;
        this.login = true;
      } 
      else {
        this.welcome = 'Account';
        this.login = false;
        this.router.navigate['/login'];
      }
    });
  }

  logoff() {
    this.session.destroySession({sessionID: this.cookie.get('sessionID')}).subscribe(data => {
    });
    this.router.navigate(['/login']);
    this.ngOnInit();
  }
}
