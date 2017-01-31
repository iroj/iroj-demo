import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KingdevickPage } from '../kingdevick/kingdevick';
import { DemPage } from '../dem/dem';
@Component({
  selector: 'page-main-test',
  templateUrl: 'main-test.html'
})
export class MainTestPage {
public type=''
  constructor(public navCtrl: NavController, public navParam:NavParams) {
    this.type=this.navParam.get('type');
  }

  ionViewlWillEnter() {
  }
  ionViewWillLeave() {
  }
  back() {
    this.navCtrl.popToRoot();
  }
  kd() {
    this.navCtrl.push(KingdevickPage);
  }
  dem() {
    this.navCtrl.push(DemPage);
  }

}
