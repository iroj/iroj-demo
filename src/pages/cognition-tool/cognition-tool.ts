import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-cognition-tool',
  templateUrl: 'cognition-tool.html'
})
export class CognitionToolPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CognitionToolPage');
  }
  back() {
    this.navCtrl.pop();
  }
}
