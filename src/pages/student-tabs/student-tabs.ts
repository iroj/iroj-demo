import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StudentProfilePage } from '../student-profile/student-profile';
import { StudentResultsPage } from '../student-results/student-results';
import { GlobalService } from '../../providers/global-service';

import { DataService } from '../../providers/data-service';
@Component({
  templateUrl: 'student-tabs.html'
})
export class StudentTabsPage {
  public user: any;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StudentProfilePage;
  tab2Root: any = StudentResultsPage;

  constructor(public global: GlobalService, public data: DataService, public navCtrl: NavController) {
    this.user = this.global.getUser();
    console.log(this.user);
  }
}
