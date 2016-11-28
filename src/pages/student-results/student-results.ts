import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-student-results',
  templateUrl: 'student-results.html'
})
export class StudentResultsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello StudentResultsPage Page');
  }

}
