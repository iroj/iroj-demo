import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {MediaPlugin, Transfer} from 'ionic-native';

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
    let test = this.testService.returnTest();
    console.log(test);
    this.type = test.type;
    console.log(this.type);
  }

  uniqueName() {
    let name = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++)
      name += possible.charAt(Math.floor(Math.random() * possible.length));
    return name + ".wav";
  }

  back() {
    // if(this.newFile)
    //   this.newFile.stopRecord();
    this.demService.resetDEMcards();
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
    this.selectedCard.fileName = this.uniqueName();
    this.newFile = new MediaPlugin(this.selectedCard.fileName);
    this.newFile.startRecord();
    console.log('new record start: ');
    this.toast.showToast('Audio Recording Started')

  }

  stop() {
    this.selectedCard.time = this.timer;
    this.selectedCard = this.demService.analyze(this.selectedCard, this.navParams.get('index'));
    console.log('record stop: ');
    console.log(this.selectedCard);
    this.newFile.stopRecord();
    this.toast.showToast('Audio Recording Stopped')
    this.navCtrl.pop();
  this.uploadFile(this.selectedCard.fileName)
  }


  pause() {
    this.status = 'paused';
    this.clock.unsubscribe();
    this.elapsedTime = this.timer;
  }

  resume() {
    this.status = 'running';
    this.clock = TimerObservable.create(0, 1000).subscribe(t => {
      this.timer = this.elapsedTime + t;
    });
  }

  uploadFile(file) {
    console.log(file);
    const fileTransfer = new Transfer();
    options = {
      fileKey: 'file'
  }
    fileTransfer.upload("<file path>", "<api endpoint>", options)
      .then((data) => {
        // success
      }, (err) => {
        // error
      })

    // let upload = SC.upload({
    //   file: file, // a Blob of your WAV, MP3...
    //   title: 'This upload took quite some while'
    // });
    //
    // upload.request.addEventListener('progress', function (e) {
    //   console.log('progress: ', (e.loaded / e.total) * 100, '%');
    // });
    //
    // upload.then(function (track) {
    //   alert('Upload is done! Check your sound at ' + track.permalink_url);
    // };
  };

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
    this.newFile = null;
    this.selectedCard.fileName = ''
  }


}
