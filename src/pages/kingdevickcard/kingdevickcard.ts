import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import {KingdevickPage} from '../kingdevick/kingdevick';
@Component({
  selector: 'page-kingdevickcard',
  templateUrl: 'kingdevickcard.html'
})
export class KingDevickCardPage {
  public selectedCard: any;
  public timer = { min: 0, sec: 0 };
  public clock: any;
  public status = 'stop';
  public elapsedTime = 0;
  public errors = 0;
  constructor(public navParams: NavParams, public navCtrl: NavController) {
    this.selectedCard = this.navParams.get('selectedcard');
    console.log(this.selectedCard)
  }
  back() {
    this.navCtrl.push(KingdevickPage);
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
    this.selectedCard.errors = this.errors
    this.navCtrl.push(KingdevickPage,{resultCard:this.selectedCard, index:this.navParams.get('index')});
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
    this.timer = { min: 0, sec: 0 };
    this.elapsedTime = 0;
    this.errors = 0;
    this.clock.unsubscribe();
  }

}