import { Component } from '@angular/core';
import { NavController, ModalController, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { TestService } from '../../providers/test-service';
import { ToastService } from '../../providers/toast-service';
import { GlobalService } from '../../providers/global-service';
import { Camera } from 'ionic-native';

import { MainTestPage } from '../main-test/main-test';

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
    console.log(this.newtest)
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

@Component({
  selector: 'page-addPlayer',
  templateUrl: 'addPlayer.html'
})
export class AddPlayerPage {
  public newPlayer = {
    profileImageId: '', fullName: '', username: '', email: '', school: undefined, approved: true, roles: ['student'], provider: 'local'
  };
  public access = false;
  public err = '';
  public user: any;
  constructor(public viewCtrl: ViewController, public toast: ToastController, public test: TestService, public loading: LoadingController, public global: GlobalService) {
    this.user = this.global.getUser();
    this.newPlayer.school = this.user.school;
  }
  back() {
    this.viewCtrl.dismiss();
  }

  openCamera() {
    console.log('open camera');
    let options = { destinationType: 0, quality: 80, targetWidth: 200, allowEdit: true }
    Camera.getPicture(options).then((imageData) => {
      this.newPlayer.profileImageId = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  getFile() {
    console.log('open gallery');
    let options = { destinationType: 0, quality: 80, targetWidth: 200, sourceType: 2 }
    Camera.getPicture(options).then((imageData) => {
      this.newPlayer.profileImageId = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  add() {
    if (!this.newPlayer.fullName)
      this.err = 'Please enter username'
    else if (this.access && !this.newPlayer.email)
      this.err = 'Please enter email address if the player wants access to personal records'
    else {
      this.newPlayer.username = this.newPlayer.fullName.split(" ")[0] + Math.floor((Math.random() * 100));
      let adding = this.loading.create({
        content: 'Adding new player'
      })
      adding.present()
      console.log(this.newPlayer)
      this.test.addPlayer(this.newPlayer).subscribe(data => {
        adding.dismiss();
        let toast = this.toast.create({
          message: data.message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.viewCtrl.dismiss(data.player);
      }, err => {
        adding.dismiss();
        this.err = JSON.parse(err._body).message;
      })
    }
  }
}


