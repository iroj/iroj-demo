import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { MediaPlugin } from 'ionic-native';

import { DemService } from '../../providers/dem-service';
import { ToastService } from '../../providers/toast-service';
import { TestService } from '../../providers/test-service';
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
  public inputString = '';
  public type = '';
  public newFile: any;
  constructor(public navParams: NavParams, public loadingController: LoadingController, public navCtrl: NavController,
    public demService: DemService, public toast: ToastService, public testService: TestService) {
    this.selectedCard = this.demService.getDEMcard(this.navParams.get('index'));
    this.timer = this.selectedCard.time;
    let test = this.testService.returnTest()
    console.log(test);
    this.type = test.type
    console.log(this.type);
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
  }
  add(x) {
    // this.inputs[Math.floor(this.selectedCard.inputArray.length / 10)].push(x);
    this.selectedCard.inputArray.push(x);
    this.inputString = this.selectedCard.inputArray.join('')
  }
  start() {
    this.status = 'running';
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = t;
    });
    this.newFile = new MediaPlugin('../Library/NoCloud/recording.wav');
    this.newFile.startRecord();

  }

  stop() {
    if (this.type === 'Concussion') {
      if (this.selectedCard.inputArray.length < 30) {
        this.toast.showToast('Not enough data..please reset test')
      }
      else {
        this.selectedCard.time = this.timer;
        this.selectedCard = this.demService.analyze(this.selectedCard, this.navParams.get('index'));
        console.log(this.selectedCard)
      }
    }
    this.newFile.stopRecord();
    this.newFile.play();
    // this.navCtrl.pop();
  }

  pause() {
    this.status = 'paused';
    this.newFile.pauseRecord();
    this.clock.unsubscribe();
    this.elapsedTime = this.timer;
  }

  resume() {
    this.status = 'running';
    this.newFile.resumeRecord();

    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = this.elapsedTime + t;
    });
  }

  reset() {
    this.inputString = '';
    this.selectedCard.inputArray = [];
    if (this.clock)
      this.clock.unsubscribe();
    this.status = 'stop';
    this.timer = 0;
    this.elapsedTime = 0;
    if (this.clock)
      this.clock.unsubscribe();
  }

}
