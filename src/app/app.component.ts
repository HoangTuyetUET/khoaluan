import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Book } from '../pages/book/book';
//import { Page1 } from '../pages/page1/page1';
//import { Page2 } from '../pages/page2/page2';
import { About } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Book;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.hide();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sách', component: Book },
      { title: 'Giới thiệu', component: About }
      // { title: 'Page One', component: Page1 },
      // { title: 'Page Two', component: Page2 }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
