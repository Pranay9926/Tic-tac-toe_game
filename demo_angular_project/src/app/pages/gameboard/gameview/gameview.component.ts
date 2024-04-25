import { Component } from '@angular/core';
import { SocketService } from '../../socket-service';

@Component({
  selector: 'app-gameview',
  templateUrl: './gameview.component.html',
  styleUrls: ['./gameview.component.scss']
})
export class GameviewComponent {

  state = Array(9).fill(null);
  checked:boolean=false;
  isXplayer:boolean=false;
  toggle:boolean=false;
  togglebox:boolean=true;
  result:string;
  disabled:boolean=false;
  count:number = 0;
  num:string;
  Name:object;
  Name2:string;
  roomId:number;
  


  constructor(private socket: SocketService){
    let value1 = localStorage.getItem('dataSource');
    if (value1) {
      this.Name = JSON.parse(value1).loginInput;
    }

    let value2 = localStorage.getItem('roomID');
    if (value2) {
      this.roomId = Number(value2);
      console.log("this is roomid",this.roomId);
    }

    socket.listen('receive_info').subscribe(data=>{
      console.log(data);
      this.Name2=data.name;
      console.log("this is name2",this.Name2);
      this.roomId=data.room;
      this.socket.emit('send_info_join', { name: this.Name, room: this.roomId,togglebox:!this.togglebox,toggel:!this.isXplayer,variable:true });
      
    })
    
    socket.listen('receive_info_join').subscribe(data=>{
      console.log(data);
      this.Name2=data.name;
      console.log("this is name2 join",this.Name2);
      this.roomId=data.room;
      this.togglebox=data.togglebox;
      this.isXplayer=data.toggel;
    })

    socket.listen('gametie_receive_reset').subscribe(data=>{
      console.log("gametie_receive_reset",data);
      this.disabled = data.disable;
    })

    socket.listen('receive_message').subscribe(data=>{
      console.log(data);
      this.Name2=data.name;
      this.state=data.state;
      this.isXplayer=data.toggel;
      this.togglebox=data.boxvisiable;
      this.result=data.result;
      this.count = data.count;
      this.checkWinner();
    })

    socket.listen('receive_reset').subscribe(data=>{
      console.log(data);
        
        this.toggle = data.toggel;
        this.state = data.state;
        this.count = data.count;
        this.disabled = data.disable;
        this.togglebox = !data.togglebox;
    })
  }

  handleClick(item:number){
    this.togglebox=true;
    this.count = this.count +1;
    let copystate = [...this.state];
    copystate[item] = this.isXplayer? "O" : "X";
    this.state = copystate;
    console.log(this.isXplayer);
    this.isXplayer = !this.isXplayer;
  
    console.log(this.state);
    console.log(this.count);
    let chekc = this.checkWinner()
    if(this.count == 9 && chekc == false){
      this.disabled =true
      this.socket.emit('gametie_send_reset',{disable:this.disabled,room:this.roomId})
    }
    this.socket.emit('send_message',{state:this.state,name:this.Name,count:this.count,toggel:this.isXplayer,room:this.roomId,boxvisiable:!this.togglebox})
  }

  checkWinner(){
    const winningConditions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i of winningConditions){
      const [a,b,c] = i;
      if(this.state[a] !== null &&  this.state[a] === this.state[b] && this.state[a] === this.state[c]){
        this.num = i.join('');
        console.log('hit',this.num)
        this.result = this.state[a];
        this.toggle = true;
        this.togglebox=true;
        console.log(this.toggle)
        return true;
      }
    }
    return false;
  }

  restButton(){
    this.toggle = false;
    this.state = Array(9).fill(null);
    this.count = 0;
    this.disabled = false;
    this.togglebox = false;
    this.socket.emit('send_reset',{state:this.state,toggel:this.toggle,room:this.roomId,count:this.count,disable:this.disabled,togglebox:this.togglebox})

  }

  
}
