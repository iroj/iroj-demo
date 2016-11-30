import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import { DemTestCardPage } from '../demtestcard/demtestcard';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) { }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
      console.log(this.navParams)

    if (this.navParams.get('resultCard')) {
      this.cards[this.navParams.get('index')] = this.navParams.get('resultCard');
    }
    ScreenOrientation.lockOrientation('landscape');
    
  }
  ionViewWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
  start(i, card) {
    console.log(card)
    this.navCtrl.push(DemTestCardPage, { selectedcard: card, index: i })
  }
}

