import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {MediaPlugin, File} from 'ionic-native';

import {DemService} from '../../providers/dem-service';
import {ToastService} from '../../providers/toast-service';
import {TestService} from '../../providers/test-service';
import _ from 'lodash';
declare var cordova: any;
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
    if (this.selectedCard.inputArray.length < 50) {
      this.selectedCard.inputArray.push(x);
      this.inputString = this.selectedCard.inputArray.join('')
    }
  }

  start() {
    this.status = 'running';
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = t;
    });
    this.newFile = new MediaPlugin('recording.wav');
    this.newFile.startRecord();

  }

  stop() {
    if (this.type === 'Concussion' && this.selectedCard.inputArray.length < 30) {
      this.toast.showToast('Not enough data.');
      return
    }
    this.selectedCard.time = this.timer;
    this.selectedCard = this.demService.analyze(this.selectedCard, this.navParams.get('index'));
    this.newFile.stopRecord();
    this.newFile.play();
    File.readAsDataURL(cordova.file.dataDirectory, 'recording.wav').then(data => {
      this.selectedCard.audio = data;
    });
    console.log(this.selectedCard);
    this.navCtrl.pop();
  }


  pause() {
    this.status = 'paused';
    this.clock.unsubscribe();
    this.elapsedTime = this.timer;
    this.newFile.pauseRecord();
  }

  resume() {
    this.status = 'running';
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = this.elapsedTime + t;
    });
    this.newFile.resumeRecord();

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
