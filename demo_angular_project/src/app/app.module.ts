import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule,} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule} from '@angular/material/select';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { JoinRoomComponent } from './pages/gameboard/join-room/join-room.component';
import { GameviewComponent } from './pages/gameboard/gameview/gameview.component';
import { SocketService } from './pages/socket-service';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    JoinRoomComponent,
    GameviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatCardModule, MatButtonModule,MatToolbarModule,MatIconModule,MatSidenavModule,MatSelectModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, BrowserAnimationsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
