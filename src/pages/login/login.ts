import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StudentTabsPage } from '../student-tabs/student-tabs';
import { GlobalService } from '../../providers/global-service';
import { DataService } from '../../providers/data-service';
import { AuthService } from '../../providers/auth-service';
import { ToastService } from '../../providers/toast-service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public showLogin = true;
  public loginData = { username: '', password: '' };
  constructor(public navCtrl: NavController, public toast: ToastService, public loadingController: LoadingController,
    public alertController: AlertController, public data: DataService, public global: GlobalService, public auth: AuthService) { }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  signin() {
    if (!this.loginData.username || !this.loginData.password)
      this.toast.showToast('Plase enter credentials');
    else {
      this.loginData.username = this.loginData.username.trim();
      let loading = this.loadingController.create({
        content: 'Logging In...'
      });
      loading.present()
      this.auth.login(this.loginData).subscribe(
        data => {
          data = data.user;
          console.log(data);
          loading.dismiss();
          this.global.setUser(data);
          this.data.save('user', data);
          this.navCtrl.popToRoot().then(success => {
            if (data.roles[0] === 'student')
              this.navCtrl.push(StudentTabsPage)
            else
              this.navCtrl.push(TabsPage)
          })
        },
        error => {
          this.toast.showToast(JSON.parse(error._body).message);
          loading.dismiss();
        })
    }
    // this.navCtrl.setRoot(TabsPage)
  }


  startTutorials() {
    console.log('start tutorials')
  }
}
