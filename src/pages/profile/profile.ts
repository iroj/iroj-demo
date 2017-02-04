import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { GlobalService } from '../../providers/global-service';
import { DataService } from '../../providers/data-service';
import { ProfileService } from '../../providers/profile-service';
import {ToastService } from '../../providers/toast-service';
import { Camera } from 'ionic-native';
import { LoginPage } from '../login/login';
import moment from 'moment';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public user: any;
  public school: any;
  public showGames = false;

  constructor(public navCtrl: NavController, public toast: ToastService, public global: GlobalService, public loading: LoadingController, public alertCtrl: AlertController, public data: DataService, public profile: ProfileService) {
    this.user = this.global.getUser();
    this.checkSchool();
  }
  checkSchool() {
    console.log('checking')
    this.profile.getSchool(this.user.school).subscribe(school => {
      if (moment().isBefore(moment(school.expiring)))
        this.school = school
      else {
        let alert = this.alertCtrl.create({
          title: 'Expired',
          subTitle: "This school's trial period has expired. Please contact Global Admin",
          buttons: [{
            text: 'Ok',
            handler: data => {
              this.signout();
            }
          }]
        });
        alert.present();
      }
    })

  }
  ionViewDidLoad() {
  }

  submit() {
    console.log(this.user);
    let loading = this.loading.create({
      content: 'Updating profile',
      duration: 5000
    })
    loading.present()
    this.profile.updateProfile(this.user).subscribe(data => {
      this.global.setUser(data);
      this.data.save('user', data);
      loading.dismiss();
      this.toast.showToast('Profile updated successfully');
    }, err => {
     this.toast.showToast(JSON.parse(err._body).msg)
    })
  }

  openCamera() {
    console.log('open camera');
    let options = { destinationType: 0, quality: 80, targetWidth: 200, allowEdit: true }
    Camera.getPicture(options).then((imageData) => {
      this.user.profileImageId = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  getFile() {
    console.log('open gallery');
    let options = { destinationType: 0, quality: 80, targetWidth: 200, sourceType: 2 }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.user.profileImageId = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }
  signout() {
    this.data.remove('user')
    this.navCtrl.push(LoginPage);
  }

}
