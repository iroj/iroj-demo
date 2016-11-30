import {Component} from '@angular/core';
import {NavController,  NavParams} from 'ionic-angular';
import {ScreenOrientation} from 'ionic-native';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {DemPage } from '../dem/dem';

@Component({
  selector: 'page-demtestcard',
  templateUrl: 'demtestcard.html'
})
export class DemTestCardPage {
  public selectedCard: any;
  public timer = {min: 0, sec: 0};
  public clock: any;
  public status = 'stop';
  public elapsedTime = 0;
  public errors = {O: 0, S: 0, A: 0, T: 0};


  constructor(public navParams: NavParams, public navCtrl:NavController) {
    this.selectedCard = this.navParams.get('selectedcard');
    console.log(this.selectedCard);
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

  start() {
    this.status = 'running';
    this.clock = TimerObservable.create(1000, 1000).subscribe(t => {
      this.timer.min = Math.floor(t / 60);
      this.timer.sec = t % 60;
    });
  }

  stop() {
    this.selectedCard.time = this.timer.sec + this.timer.min * 60;
    this.selectedCard.O = this.errors.O;
    this.selectedCard.S = this.errors.S;
    this.selectedCard.A = this.errors.A;
    this.selectedCard.T = this.errors.T;
    this.navCtrl.push(DemPage,{resultCard:this.selectedCard, index:this.navParams.get('index')});
  }

  pause() {
    this.status = 'paused';
    this.clock.unsubscribe();
    this.elapsedTime = this.timer.sec + this.timer.min * 60;
  }

  resume() {
    this.status = 'running'
    this.clock = TimerObservable.create(1000, 1000).subscribe(t => {
      t = this.elapsedTime + t;
      this.timer.min = Math.floor(t / 60);
      this.timer.sec = t % 60;
    });
  }

  reset() {
    this.status = 'stop';
    this.timer = {min: 0, sec: 0};
    this.elapsedTime = 0;
    this.errors = {O: 0, S: 0, A: 0, T: 0};
    this.clock.unsubscribe();
  }

}
