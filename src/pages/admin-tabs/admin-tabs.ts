import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login'
import {DataService} from '../../providers/data-service';
@Component({
  selector: 'page-admin-tabs',
  templateUrl: 'admin-tabs.html'
})
export class AdminTabsPage {

  constructor(public navCtrl: NavController,public data:DataService) {}

  ionViewDidLoad() {
    console.log('Hello AdminTabsPage Page');
  }
 signout(){
this.data.remove('user')
this.navCtrl.setRoot(LoginPage);
  }
}
