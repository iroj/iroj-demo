import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DemService} from '../../providers/dem-service';
import {ToastService} from '../../providers/toast-service';
import {TimerObservable} from "rxjs/observable/TimerObservable";

import {MediaPlugin} from 'ionic-native';

declare var cordova: any;
@Component({
  selector: 'page-dem-input',
  templateUrl: 'dem-input.html'
})

export class DemInputPage {
  public selectedCard: any;
  public recordedFile: any;
  public inputString = '';
  public status = 'stop';
  public timer = 0;
  public elapsedTime = 0;
  public clock: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public demService: DemService, public toast: ToastService) {
    this.selectedCard = this.demService.getDEMcard(this.navParams.get('index'));
    this.selectedCard.inputArray = [];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemInputPage');
    let fileName = this.selectedCard.fileName;
    console.log(fileName)
    this.recordedFile = new MediaPlugin(fileName);
    console.log(this.recordedFile)
    console.log(this.recordedFile.getDuration())
  }

  add(x) {
    if (this.selectedCard.inputArray.length < 50) {
      this.selectedCard.inputArray.push(x);
      this.inputString = this.selectedCard.inputArray.join('')
    }
  }

  start() {
    this.status = 'running';
    this.recordedFile.play();
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = t;
      if (t > this.selectedCard.time)
        this.stop()
    });
  }

  back() {
    if (this.selectedCard.inputArray.length < 30) {
      this.toast.showToast('Not enough data.');
    } else
      this.selectedCard = this.demService.analyze(this.selectedCard, this.navParams.get('index'));
    this.recordedFile.stop();
    console.log(this.selectedCard);
    this.navCtrl.pop();
  }


  pause() {
    this.status = 'paused';
    this.recordedFile.pause();
    this.clock.unsubscribe();
    this.elapsedTime = this.timer;
  }

  resume() {
    this.status = 'running';
    this.recordedFile.play();
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = this.elapsedTime + t;
    });
  }

  reset() {
    this.inputString = '';
    this.selectedCard.inputArray = [];
    this.recordedFile.stop();
    this.status = 'stop';
    this.timer = 0;
  }

  stop() {
    this.timer = 0;
    this.clock.unsubscribe();
    this.status = 'stop';
  }
}
