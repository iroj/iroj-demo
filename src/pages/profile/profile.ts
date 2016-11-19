import {Component} from '@angular/core';
import {NavController, LoadingController, ToastController} from 'ionic-angular';
import {GlobalService} from '../../providers/global-service';
import {DataService} from '../../providers/data-service';
import {ProfileService} from '../../providers/profile-service';
import {Camera} from 'ionic-native';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public user: any;
  public schools: any;
  public personal = false;
  public showGames = false;
  public base64Image: any;

  constructor(public navCtrl: NavController, public global: GlobalService, public loading: LoadingController, public toast: ToastController, public data: DataService, public profile: ProfileService) {
    this.user = this.global.getUser();
    if (this.user.email)
      this.personal = true;
    console.log(this.user)
    this.profile.getSchools().subscribe(data=> {
      this.schools = data;
      console.log(this.schools)
    })
  }

  ionViewDidLoad() {
    console.log(this.user);
  }

  submit() {
    console.log(this.user);
    let loading = this.loading.create({
      content: 'Updating profile',
      duration: 5000
    })
    loading.present()
    this.profile.updateProfile(this.user).subscribe(data=> {
      this.global.setUser(data);
      this.data.save('user', data);
      loading.dismiss();
      let toast = this.toast.create({
        message: 'Profile updated successfully',
        duration: 3000,
        position: 'bottom'
      });
      toast.present()
    }, err=> {
      let toast = this.toast.create({
        message: JSON.parse(err._body).msg,
        duration: 3000,
        position: 'bottom'
      })
      toast.present();
    })
  }

  openCamera() {
    console.log('open camera');
    let options = {destinationType: 0, }
    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  getFile() {
    console.log('open file explorer')
  }


}
