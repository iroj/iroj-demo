import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DemService } from '../../providers/dem-service';
import { ToastService } from '../../providers/toast-service';

import { MediaPlugin, File } from 'ionic-native';

@Component({
  selector: 'page-dem-input',
  templateUrl: 'dem-input.html'
})
export class DemInputPage {
  public selectedCard: any;
  public recordedFile: any;
  public inputString = '';
  public status = 'stop';

  constructor(public navCtrl: NavController, public navParams: NavParams, public demService: DemService, public toast: ToastService) {
    this.selectedCard = this.demService.getDEMcard(this.navParams.get('index'));
    this.selectedCard.inputArray = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemInputPage');
    this.recordedFile = new MediaPlugin(this.selectedCard.fileName);
    //  this.recordedFile.play();
    // File.readAsDataURL(cordova.file.dataDirectory, 'recording.wav').then(data => {
    // });

  }
  back() {
    //   this.recordedFile.stop();
    //   this.recordedFile.release();
    this.demService.resetDEMcards();
    this.navCtrl.pop();
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
    this.recordedFile.play();

  }

  stop() {
    if (this.selectedCard.inputArray.length < 30) {
      this.toast.showToast('Not enough data.');
      return
    }
    this.selectedCard = this.demService.analyze(this.selectedCard, this.navParams.get('index'));
    this.recordedFile.stop();
    console.log(this.selectedCard);
    // if (this.newFile) {
    //   console.log('record stop: ', this.newFile);

    //   this.newFile.stopRecord();
    //


    this.navCtrl.pop();
  }


  pause() {
    this.status = 'paused';
    this.recordedFile.pause();
  }

  resume() {
    this.status = 'running';
    this.recordedFile.play();
  }

  reset() {
    this.inputString = '';
    this.selectedCard.inputArray = [];
    this.recordedFile.stop();

    this.status = 'stop';

  }
}
