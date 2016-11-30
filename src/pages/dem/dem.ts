import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'page-dem',
  templateUrl: 'dem.html'
})

export class DemPage {
  public cards = [{
    name: 'DEM A',
    row1: [3, 7, 5, 9, 8, 2, 5, 7, 4, 6],
    row2: [1, 4, 7, 6, 3, 7, 9, 3, 9, 2],
    row3: [4, 5, 2, 1, 7, 5, 3, 7, 4, 8],
    row4: [7, 4, 6, 5, 2, 9, 2, 3, 6, 4],
    O: 0,
    S: 0,
    A: 0,
    T: 0,
    time: 0
    },
    {
      name: 'DEM B',

      row1: [6, 3, 2, 9, 1, 7, 4, 6, 5, 2],
      row2: [5, 3, 7, 4, 8, 4, 5, 2, 1, 7],
      row3: [7, 9, 3, 9, 2, 1, 4, 7, 6, 3],
      row4: [2, 5, 7, 4, 6, 3, 7, 5, 9, 8],
      O: 0,
      S: 0,
      A: 0,
      T: 0,
      time: 0
    },
    {
      name: 'DEM C',
      row1: [3, 7, 5, 9, 8, 2, 5, 7, 4, 6],
      row2: [1, 4, 7, 6, 3, 7, 9, 3, 9, 2],
      row3: [4, 5, 2, 1, 7, 5, 3, 7, 4, 8],
      row4: [7, 4, 6, 5, 2, 9, 2, 3, 6, 4],
      O: 0,
      S: 0,
      A: 0,
      T: 0,
      time: 0
  }]
  constructor(public navCtrl: NavController, public modal: ModalController) { }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
    ScreenOrientation.lockOrientation('landscape');
  }
  ionViewWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
  start(i, card) {
    let modal = this.modal.create(DemTestCardPage, { selectedcard: card });
    modal.present();
    modal.onDidDismiss(data => {
      if (data)
        this.cards[i] = data
    })
  }
}


@Component({
  selector: 'page-demtestcard',
  templateUrl: 'demtestcard.html'
})
export class DemTestCardPage {
  public selectedCard: any;
  public timer = { min: 0, sec: 0 };
  public clock: any;
  public status = 'stop';
  public elapsedTime = 0;
  public errors = {O:0, S:0, A:0,T:0};
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.selectedCard = this.navParams.get('selectedcard');
    console.log(this.selectedCard)
  }
  back() {
    this.viewCtrl.dismiss();
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
    this.viewCtrl.dismiss(this.selectedCard);
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
    this.errors = {O:0, S:0, A:0,T:0};
    this.clock.unsubscribe();
  }

}
