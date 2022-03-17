import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Snowpad';

  constructor(){
    let isUserLogIn = localStorage.getItem('swowpadUser') ? JSON.parse(localStorage.getItem('swowpadUser') || '') : {};

    console.log("isUserLogIn>>",isUserLogIn);
    
  }
}
