import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { SocketService } from '../socket-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    title:string = "Dashboard";
    Roomid:number;

  constructor(private router: Router,private location: Location,private socket: SocketService){
    
  }
  logout(){
    this.router.navigate(['login']);
    localStorage.clear();
  }
  back(){
    this.location.back();
     localStorage.clear();
  }
}
