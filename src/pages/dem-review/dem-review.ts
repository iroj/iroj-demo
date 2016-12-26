import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DemReview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dem-review',
  templateUrl: 'dem-review.html'
})
export class DemReviewPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DemReviewPage Page');
  }

}
