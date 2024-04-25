import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../../socket-service';


@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent {
Name:object;
joinroomform: FormGroup;
submitted = false;
toggle:boolean=false;


constructor(public formBuilder: FormBuilder,private router: Router,private socket: SocketService) {
  let value = localStorage.getItem('dataSource');
  if(value){
    this.Name= JSON.parse(value).loginInput;
  }
  console.log("this is name",this.Name)
  // this.Name=(localStorage.getItem('dataSource'));
}
ngOnInit() {
      this.joinroomform = this.formBuilder.group({
        roomID: ['', [Validators.required]]
      });
    }
gotoGameview(){
      let x = Math.floor((Math.random() * 1000000) + 1);
      this.socket.emit('join_room', { name: this.Name, room: x });
      
      console.log("join roomm",this.Name)
      localStorage.setItem('roomID', JSON.stringify(x));

    this.router.navigate(['gameview']);
}
    // convenience getter for easy access to form fields
    get f() { return this.joinroomform.controls; }

    onSubmit() {
      this.submitted = true;

      if(this.joinroomform.invalid){
        return;
      }
      console.log(Number(this.joinroomform.value.roomID));
      
      this.socket.emit('join_room', { name: this.Name, room: Number(this.joinroomform.value.roomID) });
      this.socket.emit('send_info', { name: this.Name, room: Number(this.joinroomform.value.roomID),variable:true });
      localStorage.setItem('roomID', JSON.stringify(Number(this.joinroomform.value.roomID)));

      this.router.navigate(['gameview']);
     }

}
