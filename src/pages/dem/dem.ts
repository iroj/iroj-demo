import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Dem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dem',
  templateUrl: 'dem.html'
})
export class DemPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DemPage Page');
  }

}
