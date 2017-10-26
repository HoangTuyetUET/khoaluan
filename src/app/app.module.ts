import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicModule } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { Book } from '../pages/book/book';
import { Unit } from '../pages/unit/unit';
import { Learning } from '../pages/learning/learning'; 
import { Playing } from '../pages/playing/playing';
import { Review } from '../pages/review/review';
import { About } from '../pages/about/about';

import { Listening } from '../components/listening/listening';
import { Reading } from '../components/reading/reading';
//import { Speaking } from '../components/speaking/speaking';
import { Writing } from '../components/writing/writing';
import { Login } from '../components/login/login';
import { MyTitle } from '../components/my-title/my-title';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Book,
    Unit,
    Learning,
    Review,
    Playing,
    Listening,
    Reading,
    Writing,
    Login,
    About,
    MyTitle
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Book,
    Unit,
    Learning,
    Playing,
    Review,
    About
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
