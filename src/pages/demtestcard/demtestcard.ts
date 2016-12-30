import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { DemService } from '../../providers/dem-service';
import { ToastService } from '../../providers/toast-service';
import _ from 'lodash';
@Component({
  selector: 'page-demtestcard',
  templateUrl: 'demtestcard.html'
})
export class DemTestCardPage {
  public selectedCard: any;
  public timer = 0;
  public clock: any;
  public status = 'stop';
  public elapsedTime = 0;
  // public errors = { O: 0, S: 0, A: 0, T: 0 };
  public inputs = [[], [], [], [], []];
  public inputArray = [];
  constructor(public navParams: NavParams, public loadingController: LoadingController, public navCtrl: NavController,
    public demService: DemService, public toast: ToastService) {
    this.selectedCard = this.demService.getDEMcard(this.navParams.get('index'));
    console.log(this.selectedCard)
    this.timer = this.selectedCard.time;
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    ScreenOrientation.lockOrientation('landscape');
  }

  ionViewWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
  add(x) {
    this.inputs[Math.floor(this.selectedCard.inputArray.length / 10)].push(x);
    this.selectedCard.inputArray.push(x);
  }
  start() {
    this.status = 'running';
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = t;
    });
  }

  stop() {
    // if (this.inputArray.length < 30) {
    //   this.toast.showToast('Not enough data..please reset test')
    // }
    // else {
      console.log('data array: ', this.selectedCard.dataArray)
      console.log('input array: ', this.selectedCard.inputArray)
      this.selectedCard.time = this.timer;
      this.selectedCard = this.demService.analyze(this.selectedCard, this.navParams.get('index'));
      console.log(this.selectedCard)
      this.navCtrl.pop();
    // }
  }

  pause() {
    this.status = 'paused';
    this.clock.unsubscribe();
    this.elapsedTime = this.timer;
  }

  resume() {
    this.status = 'running'
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = this.elapsedTime + t
    });
  }

  reset() {
    this.errors = { O: 0, S: 0, A: 0, T: 0 };
    this.inputs = [[], [], [], []];
    this.inputArray = [];
    if (this.clock)
      this.clock.unsubscribe();
    this.status = 'stop';
    this.timer = 0;
    this.elapsedTime = 0;
    if (this.clock)
      this.clock.unsubscribe();
  }

}
