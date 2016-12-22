import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { TestService } from '../../providers/test-service';
@Component({
  selector: 'page-kingdevickcard',
  templateUrl: 'kingdevickcard.html'
})
export class KingDevickCardPage {
  public selectedCard: any;
  public timer = 0;
  public clock: any;
  public status = 'stop';
  public elapsedTime = 0;
  public errors = 0;
  constructor(public navParams: NavParams, public navCtrl: NavController, public testService: TestService) {
    this.selectedCard = this.testService.getKDcard(this.navParams.get('index'));
    console.log(this.selectedCard)
    this.timer = this.selectedCard.time;
    this.errors = this.selectedCard.errors;
  }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
    // ScreenOrientation.lockOrientation('landscape');
  }
  ionViewWillLeave() {
    // ScreenOrientation.unlockOrientation();
  }
  start() {
    this.status = 'running';
    this.errors = 0;
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = t;
    });
  }

  stop() {
    this.selectedCard.time = this.timer;
    this.selectedCard.errors = this.errors;
    this.testService.setKDcard(this.selectedCard, this.navParams.get('index'))
    this.navCtrl.pop();
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
    this.status = 'stop';
    this.timer = 0;
    this.elapsedTime = 0;
    this.errors = 0;
    if (this.clock)
      this.clock.unsubscribe();
  }

}
