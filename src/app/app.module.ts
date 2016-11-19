import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {Storage} from '@ionic/storage'

//pages
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
import { ProfilePage } from '../pages/profile/profile';
import { TestingPage } from '../pages/testing/testing';
import { ResultsPage } from '../pages/results/results';
//providers
import {AuthService} from '../providers/auth-service'
import {ProfileService} from '../providers/profile-service'
import {TestService} from '../providers/test-service'
import {ResultService} from '../providers/result-service'
import {DataService} from '../providers/data-service'
import {GlobalService} from '../providers/global-service'
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    ProfilePage,
    TestingPage,
    ResultsPage,
    StudentTabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
     LoginPage,
     StudentTabsPage,
    TabsPage,
    ProfilePage,
    TestingPage,
    ResultsPage
  ],
  providers: [AuthService, ProfileService, TestService, ResultService,DataService, GlobalService, Storage]
})
export class AppModule {}
