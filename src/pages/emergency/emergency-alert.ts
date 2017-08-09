import { Component } from '@angular/core';
import {  ViewController } from 'ionic-angular';


@Component({
  selector: 'page-emergencyAlert',
  templateUrl: 'emergency-alert.html'
})
export class EmergencyAlertModal {
  constructor(public viewCtrl: ViewController) {

  }
  back() {
    this.viewCtrl.dismiss();
  }




}


