import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from 'ionic-native';
import {KingDevickCardPage} from '../kingdevickcard/kingdevickcard'
@Component({
  selector: 'page-kingdevick',
  templateUrl: 'kingdevick.html'
})

export class KingdevickPage {
  public cards = [{
    name: 'KD CARD 1',
    row1: [5, 4, 8, 7, 1],
    row2: [4, 0, 9, 3, 2],
    row3: [6, 8, 1, 5, 9],
    row4: [7, 2, 0, 8, 4],
    row5: [3, 9, 7, 1, 5],
    row6: [0, 4, 5, 7, 3],
    row7: [9, 2, 8, 5, 4],
    row8: [6, 1, 0, 9, 2],
    errors: 0,
    time: 0
  },
  {
    name: 'KD CARD 2',

    row1: [7, 1, 8, 3, 5],
    row2: [8, 5, 4, 0, 9],
    row3: [2, 9, 1, 5, 6],
    row4: [5, 4, 7, 9, 2],
    row5: [0, 8, 5, 1, 4],
    row6: [3, 2, 9, 4, 7],
    row7: [9, 0, 8, 6, 1],
    row8: [4, 5, 3, 2, 0],
    errors: 0,
    time: 0
  },
  {
    name: 'KD CARD 3',

    row1: [2, 4, 8, 3, 1],
    row2: [7, 0, 6, 5, 2],
    row3: [1, 3, 9, 4, 0],
    row4: [8, 2, 7, 0, 5],
    row5: [5, 8, 6, 9, 7],
    row6: [4, 0, 2, 5, 3],
    row7: [9, 6, 3, 1, 8],
    row8: [7, 9, 5, 4, 6],
    errors: 0,
    time: 0
  }]
  constructor(public navCtrl: NavController,public navParams: NavParams, ) { }
  back() {
    this.navCtrl.pop();
  }
  ionViewWillEnter() {
    if(this.navParams.get('resultCard')){
      this.cards[this.navParams.get('index')]= this.navParams.get('resultCard');
    }
    ScreenOrientation.lockOrientation('landscape');
    
  }
  ionViewWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
  start(i, card) {
    this.navCtrl.push(KingDevickCardPage, { selectedcard: card, index:i });
  }
}


