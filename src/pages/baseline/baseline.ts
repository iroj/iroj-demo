import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { KingdevickPage } from '../kingdevick/kingdevick';
import { DemPage } from '../dem/dem';
@Component({
  selector: 'page-baseline',
  templateUrl: 'baseline.html'
})
export class BaselinePage {

  constructor(public navCtrl: NavController) { }

  ionViewlWillEnter() {
    ScreenOrientation.lockOrientation('landscape');
  }
  ionViewWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
  back() {
    this.navCtrl.pop();
  }
  kd() {
    this.navCtrl.push(KingdevickPage);
  }
  dem() {
    this.navCtrl.push(DemPage);
  }

}
