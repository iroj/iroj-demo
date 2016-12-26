import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';


@Injectable()
export class ToastService {
  constructor(public http: Http, public toastCtrl: ToastController) {
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
