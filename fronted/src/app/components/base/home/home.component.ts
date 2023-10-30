import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn():void {
    this.authService.isJwtAvailable().subscribe(isLoggedIn=>{
      if(isLoggedIn){
        console.log("isLoggedIn working! [true statement]");
      } else {
        console.log("isLoggedIn working! [false statement]");
      }
    })
  }


  }
