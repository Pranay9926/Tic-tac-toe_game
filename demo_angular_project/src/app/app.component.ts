import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo_angular_project';

  constructor(private router: Router,){ 
    if(localStorage.getItem('dataSource') != null){
      this.router.navigate(['']);
    }
    else{
      this.router.navigate(['login'])
    }
  }
}
