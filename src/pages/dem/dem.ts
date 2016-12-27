import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { TestService } from '../../providers/test-service';
import { DemService } from '../../providers/dem-service';
import { ToastService } from '../../providers/toast-service';
import { DemReviewPage } from '../dem-review/dem-review';
import _ from 'lodash';
import { DemTestCardPage } from '../demtestcard/demtestcard';
@Component({
  selector: 'page-dem',
  templateUrl: 'dem.html'
})

export class DemPage {
  public cards = [];
  public results: any;
  constructor(public navCtrl: NavController, public loadingController: LoadingController, public navParams: NavParams, public toast: ToastService,
    public testService: TestService, public demService: DemService) {
    this.cards = this.demService.getDEMcards();
    console.log(this.cards);
  }
  ionViewWillEnter() {
    // ScreenOrientation.lockOrientation('landscape');
    this.cards = this.demService.getDEMcards();
    console.log(this.cards);

    if (this.cards[0].time > 0 && this.cards[1].time > 0 && this.cards[2].time > 0) {
      this.results = this.demService.getDEMResults();
      this.results.vtE = _.floor(this.results.vtE, 2);
      this.results.aht = _.floor(this.results.aht, 2);
      this.results.hV = _.floor(this.results.hV, 2);
      console.log(this.results);
    }
  }
  ionViewWillLeave() {
    // ScreenOrientation.unlockOrientation();
  }
  start(i) {
    this.navCtrl.push(DemTestCardPage, { index: i })
  }
  back() {
      this.navCtrl.pop();
      this.demService.resetDEMcards();
  }

  save() {
    this.testService.saveTest('DEM').subscribe(data => {
      console.log(data);
    })
  }

  review(i){
  this.navCtrl.push(DemReviewPage, {index:i});
  }

}

