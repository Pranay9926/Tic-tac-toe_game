import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { JoinRoomComponent } from '../gameboard/join-room/join-room.component';
import { GameviewComponent } from '../gameboard/gameview/gameview.component';

const routes: Routes = [
  {
    path: "",
    component: SidebarComponent,
    children: [
      {
        path: 'join-room',
        component: JoinRoomComponent,
      },
      {
        path: 'gameview',
        component: GameviewComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
