import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';

@Component({
  selector: 'page-concussion',
  templateUrl: 'concussion.html'
})
export class ConcussionPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello BaselinePage Page');
  }
  back() {
    this.navCtrl.pop();
  }
 ionViewWillEnter() {
    ScreenOrientation.lockOrientation('landscape');
  }
  ionViewWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
}
