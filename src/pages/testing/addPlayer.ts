import { Component } from '@angular/core';
import { ToastController, ViewController, LoadingController } from 'ionic-angular';
import { TestService } from '../../providers/test-service';
import { GlobalService } from '../../providers/global-service';
import { Camera } from 'ionic-native';

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
      this.err = 'Please enter full name'
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


