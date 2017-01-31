import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { KingDevickCardPage } from '../kingdevickcard/kingdevickcard';
import { ToastService } from '../../providers/toast-service';
import { KdService } from '../../providers/kd-service';
import {TestService } from '../../providers/test-service';
import { ResultsPage } from '../results/results';
import _ from 'lodash';
@Component({
  selector: 'page-kingdevick',
  templateUrl: 'kingdevick.html'
})

export class KingdevickPage {
  public cards = [];
  constructor(public navCtrl: NavController, public loadingController: LoadingController, public navParams: NavParams, public toast: ToastService, public kdService: KdService,public testService: TestService) {
    this.cards = this.kdService.getKDcards()
  }
  back() {
    if (this.cards[0].time == 0 || this.cards[1].time == 0 || this.cards[2].time == 0) {
      this.toast.showToast('All test cards not completed. Result not saved.')
          this.navCtrl.pop();
          this.kdService.resetKDcards();

    }
    else {
        let loading = this.loadingController.create({
          content: 'Saving test'
        });
        loading.present()
        this.testService.saveTest('KD').subscribe(data => {
          loading.dismiss();
          this.kdService.resetKDcards();
          this.navCtrl.pop();
        }, err=>this.toast.showToast(err))
      }
    }

  ionViewWillEnter() {
    // ScreenOrientation.lockOrientation('landscape');
  }
  ionViewWillLeave() {
    // ScreenOrientation.unlockOrientation();
  }
  start(i) {
    this.navCtrl.push(KingDevickCardPage, { index: i });
  }
}


