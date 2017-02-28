import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TestService } from '../../providers/test-service';
import { DemService } from '../../providers/dem-service';
import { GlobalService } from '../../providers/global-service';
import { ToastService } from '../../providers/toast-service';
import { DemInputPage } from '../dem-input/dem-input';
import _ from 'lodash';
import { DemTestCardPage } from '../demtestcard/demtestcard';
@Component({
  selector: 'page-dem',
  templateUrl: 'dem.html'
})

export class DemPage {
  public cards = [];
  public test:any;
    public results: any;
  constructor(public navCtrl: NavController, public loadingController: LoadingController,
              public global: GlobalService, public navParams: NavParams, public toast: ToastService,
    public testService: TestService, public demService: DemService) {
    this.cards = this.demService.getDEMcards();
    console.log(this.cards);
    this.test = this.testService.returnTest();
  }
  ionViewWillEnter() {
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
  }
  start(i) {
    this.navCtrl.push(DemTestCardPage, { index: i })
  }
  restart(i) {
    this.demService.resetDEMcards();
    this.navCtrl.push(DemTestCardPage, { index: i })
  }
  back() {
    if (this.cards[0].time == 0 || this.cards[1].time == 0 || this.cards[2].time == 0) {
      this.toast.showToast('All test cards not completed. Result not saved.')
      this.navCtrl.pop();
      this.demService.resetDEMcards();
    }
    else {
      this.save();
    }
  }

  save() {
    let loading = this.loadingController.create({
      content: 'Saving test'
    });
    loading.present()
    this.testService.saveTest('DEM').subscribe(data => {
      this.demService.resetDEMcards();
      this.navCtrl.pop();
      loading.dismiss();
    }, err => this.toast.showToast(err));
  }

  dial(i) {
    this.navCtrl.push(DemInputPage, { index: i });
  }

}

