import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TestService } from '../../providers/test-service';
import { DemService } from '../../providers/dem-service';
import { ToastService } from '../../providers/toast-service';
import { DemReviewPage } from '../dem-review/dem-review';
import { DemInputPage } from '../dem-input/dem-input';

import _ from 'lodash';
@Component({
  selector: 'page-demresultcard',
  templateUrl: 'demresultcard.html'
})
export class DemresultcardPage {
  public result: any;
  public cards: any;
  public results: any;
  constructor(public navCtrl: NavController, public loadingController: LoadingController, public navParams: NavParams, public toast: ToastService,
    public testService: TestService, public demService: DemService) {
    this.result = this.navParams.get('result');
    this.cards = this.result.DEMresults.cards
    this.results = this.result.DEMresults.results
    this.demService.setDEMresultCards(this.result.DEMresults);
  }
  ionViewWillEnter() {
    // console.log(this.cards);
    this.cards = this.demService.getDEMcards();
    if (this.cards[0].time > 0 && this.cards[1].time > 0 && this.cards[2].time > 0) {
      this.results = this.demService.getDEMResults();
      this.results.vtE = _.floor(this.results.vtE, 2);
      this.results.aht = _.floor(this.results.aht, 2);
      this.results.hV = _.floor(this.results.hV, 2);
      console.log(this.results);
    }
  }
  ionViewWillLeave() {
  }

  update() {
    let loading = this.loadingController.create({
      content: 'Saving test'
    });
    loading.present()
    this.testService.updateDEMResult(this.result).subscribe(data => {
      this.demService.resetDEMcards();
      this.navCtrl.pop();
      loading.dismiss();
    }, err => {
      this.toast.showToast(err);
      loading.dismiss();
    })
  };

  back() {
    this.navCtrl.pop();
    this.demService.resetDEMcards();
  }
  review(i) {
    this.navCtrl.push(DemReviewPage, { index: i });
  }
  dial(i) {
    this.navCtrl.push(DemInputPage, { index: i });
  }
}
