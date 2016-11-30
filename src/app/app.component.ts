import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
import { AdminTabsPage } from '../pages/admin-tabs/admin-tabs';
import {GlobalService} from '../providers/global-service'
import {DataService} from '../providers/data-service'
import { DemPage } from '../pages/dem/dem';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  public rootPage: any;

  constructor(platform: Platform, public global: GlobalService, public data:DataService) {
    // this.global.setServer('http://localhost:3000/')
    this.global.setServer('https://pomona-server.herokuapp.com/')

    platform.ready().then(() => {
      // this.rootPage=DemPage;
      this.data.getData('user').then(
        data => {
          if (data) {
            let user = JSON.parse(data)
            this.global.setUser(user);
            if (user._id && user.roles[0]==='student')
              this.rootPage = StudentTabsPage;
            else if (user._id && user.roles[0]==='admin')
              this.rootPage = AdminTabsPage;
            else if (!user._id)
              this.rootPage = LoginPage;
            else this.rootPage = TabsPage  
        } 
        else this.rootPage = LoginPage  
        });
        
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
