import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
import { GlobalService } from '../providers/global-service'
import { DataService } from '../providers/data-service'

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  public rootPage: any;

  constructor(platform: Platform, public global: GlobalService, public data: DataService) {
    platform.ready().then(() => {
      // this.data.remove('user');
      this.data.getData('user').then(
        data => {
          if (data) {
            let user = JSON.parse(data)
            this.global.setUser(user);
            if (user._id && user.roles[0] === 'student')
              this.rootPage = StudentTabsPage;
            else if (user._id && user.roles[0] === 'examiner')
              this.rootPage = TabsPage
            else
              this.rootPage = LoginPage;
          }
          else this.rootPage = LoginPage
        });
      StatusBar.overlaysWebView(false);
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
