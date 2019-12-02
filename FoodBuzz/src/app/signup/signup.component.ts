import { Component, OnInit } from '@angular/core';
import {RegserviceService} from '../regservice.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  
  constructor(private router:Router,private RegserviceService: RegserviceService) { }

  ngOnInit() {
  }

  onClickSubmit(user){
  //console.log(user.username);
    this.RegserviceService.registerUser(user);
  }
}
