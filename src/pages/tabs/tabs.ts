import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { TestingPage } from '../testing/testing';
import { ResultsPage } from '../results/results';
import {GlobalService} from '../../providers/global-service';
import {DataService} from '../../providers/data-service';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public user: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ProfilePage;
  tab2Root: any = TestingPage;
  tab3Root: any = ResultsPage;

  constructor(public global : GlobalService, public data:DataService, public navCtrl:NavController) {
  this.user = this.global.getUser();
  console.log(this.user);
  }

 
}
