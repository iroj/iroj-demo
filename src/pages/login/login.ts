import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {StudentTabsPage} from '../student-tabs/student-tabs';
import {AdminTabsPage} from '../admin-tabs/admin-tabs';
import { GlobalService } from '../../providers/global-service';
import { DataService } from '../../providers/data-service';
import { AuthService } from '../../providers/auth-service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
public showLogin = true;
public loginData={username:'', password:''};
public signupData={username:'', password:''};
public err = '';
  constructor(public navCtrl: NavController, public loadingController : LoadingController, public alertController:AlertController,public data:DataService, public global:GlobalService, public auth: AuthService) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  signin(){
    if(!this.loginData.username || !this.loginData.password)
    this.err = 'Enter credentials'
    else{
      this.err = ''
    console.log('login', this.loginData)
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
        if (data.roles[0] === 'admin' ){
            this.global.setUser(data);
            this.data.save('user', data);
            this.navCtrl.pop().then(success=>{
              if(data.roles[0]==='student')
                  this.navCtrl.setRoot(StudentTabsPage)
              else if (data.roles[0]==='admin')
                  this.navCtrl.setRoot(AdminTabsPage);
              else 
                  this.navCtrl.setRoot(TabsPage)
            })
          }
        else if(data.roles.length==0 || !data.approved)
              this.err='Your account has not been approved yet. Please contact your examiner'
         else {
            this.global.setUser(data);
            this.data.save('user', data);
          this.navCtrl.pop().then(success=>{
              if(data.roles[0]==='student')
                this.navCtrl.setRoot(StudentTabsPage)
                else 
                this.navCtrl.setRoot(TabsPage)
            })
            
        }        
      },
      error => {
        loading.dismiss();
        let alert = this.alertController.create({
          title: 'Error',
          subTitle: JSON.parse(error._body).message,
          buttons: ['Dismiss']
        });
        alert.present();
      })
    }
    // this.navCtrl.setRoot(TabsPage)  
  }


  signup(){
    if(!this.signupData.username || !this.signupData.password)
    this.err = 'Enter credentials'
    else{
      this.err = ''
    console.log('signup', this.signupData)
      this.signupData.username = this.signupData.username.trim();

    let loading = this.loadingController.create({
      content: 'Signing Up'
    });
    loading.present();
    this.auth.signup(this.signupData).subscribe(
        data => {
        loading.dismiss();
        let alert = this.alertController.create({
          title: 'Sign up succesful',
          subTitle: 'You need to be approved by the admin before you can login',
          buttons: ['Dismiss']
        });
        alert.present();
      },
      error => {
        loading.dismiss();
        let alert = this.alertController.create({
          title: 'Error',
          subTitle: JSON.parse(error._body).message,
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }
    // this.navCtrl.setRoot(TabsPage)  
  }

}
