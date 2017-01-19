import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { TestService } from '../../providers/test-service';
import { DemService } from '../../providers/dem-service';
import { ToastService } from '../../providers/toast-service';
import { DemReviewPage } from '../dem-review/dem-review';

@Component({
  selector: 'page-demresultcard',
  templateUrl: 'demresultcard.html'
})
export class DemresultcardPage {
  public result : any;
  constructor(public navCtrl: NavController, public loadingController: LoadingController, public navParams: NavParams, public toast: ToastService,
    public testService: TestService, public demService: DemService) {
    this.result = this.navParams.get('result');
    // this.cards = result.DEMresults.cards
    // this.results = result.DEMresults.results
    this.demService.setDEMresultCards(this.result.DEMresults);
    console.log(this.result);
    // console.log(this.results);
  }
  ionViewWillEnter() {
    // ScreenOrientation.lockOrientation('landscape');
    // console.log(this.cards);

    // if (this.cards[0].time > 0 && this.cards[1].time > 0 && this.cards[2].time > 0) {
    //   this.results = this.demService.getDEMResults();
    //   this.results.vtE = _.floor(this.results.vtE, 2);
    //   this.results.aht = _.floor(this.results.aht, 2);
    //   this.results.hV = _.floor(this.results.hV, 2);
    //   console.log(this.results);
    // }
  }
  ionViewWillLeave() {
    // ScreenOrientation.unlockOrientation();
  }

  update() {
    let loading = this.loadingController.create({
      content: 'Saving test'
    });
    loading.present()
    this.testService.updateDEMResult().subscribe(data => {
      this.demService.resetDEMcards();
      this.navCtrl.pop();
      loading.dismiss();
    }, err => this.toast.showToast(err));
  }
  back() {
    this.navCtrl.pop();
  }
  review(i) {
    this.navCtrl.push(DemReviewPage, { index: i });
  }
}
