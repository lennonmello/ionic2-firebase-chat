import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { ChatPage } from './../pages/chat/chat';
import { CapitalizePipe } from './../pipes/capitalize/capitalize.pipe';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { SigninPage } from './../pages/signin/signin';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { SignupPage } from './../pages/signup/signup';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {AngularFireModule,FirebaseAppConfig} from 'angularfire2';
import {HttpModule} from '@angular/http';
import { UserService } from '../providers/user/user.service';
import { AuthService } from '../providers/auth/auth.service';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from '../providers/message/message.service';

const fireBaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyDdZU2JYgCqb5T9RlEwy5e5gUG9x-MyHQk",
    authDomain: "ionic2-firebase-chat-9d98b.firebaseapp.com",
    databaseURL: "https://ionic2-firebase-chat-9d98b.firebaseio.com",
    storageBucket: "ionic2-firebase-chat-9d98b.appspot.com",
    messagingSenderId: "562923259474"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    CustomLoggedHeaderComponent,
    CapitalizePipe,
    ChatPage,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fireBaseAppConfig),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ChatPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AngularFireDatabase,
    HttpClientModule,
    HttpClient,
    AuthService,
    AngularFireAuth,
    ChatService,
    MessageService
  ]
})
export class AppModule {}
