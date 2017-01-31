import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { TestService } from '../../providers/test-service';
import { ToastService } from '../../providers/toast-service';
import { Keyboard} from 'ionic-native';

import { MainTestPage } from '../main-test/main-test';
import { AddPlayerPage } from './addPlayer';

import moment from 'moment';
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html'
})
export class TestingPage {
  public myInput = '';
  public selectedPlayer = { _id: '' };
  public playersList = [];
  public filterList = [];
  public newtest = {
    player: '', date: moment().format('DD MMMM YYYY'), habitual: undefined, npcBreak: undefined, npcRecovery: undefined,
    suppression: false, type: ''
  };
  constructor(public navCtrl: NavController, public toast: ToastService, public testService: TestService, public modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('Hello TestingPage Page');
    this.getPlayers();
  }

  getPlayers() {
    this.testService.getPlayersList().subscribe(data => {
      this.playersList = data
      console.log(data);
    })
  }

  filter(ev: any) {
    this.filterList = this.playersList;
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterList = this.filterList.filter((item) => {
        return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.fullName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  cancel() {
    this.myInput = '';
    this.filterList = [];
  }
  selectPlayer(player) {
    this.selectedPlayer = player;
    console.log(this.newtest);
    Keyboard.close();

  }

  beginTest(type) {
    // if (!this.newtest.habitual || !this.newtest.npcBreak || !this.newtest.npcRecovery)
    //   this.toast.showToast('Please complete form.')
    // else {
      this.newtest.type = type;
      this.newtest.player = this.selectedPlayer._id;
      console.log(this.newtest);
      this.testService.beginTEST(this.newtest);
      this.navCtrl.push(MainTestPage, { type: type });
    // }
  }
  addPlayer() {
    console.log('add player')
    let modal = this.modal.create(AddPlayerPage);
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.selectedPlayer = data;
        console.log(this.newtest)
      }
    })
  }

  npcgenerator(n) {
    return new Array(n)
  }
}




