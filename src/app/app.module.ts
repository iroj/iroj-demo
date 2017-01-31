import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage'
import { Http } from '@angular/http';
// import {AuthHttp, AUTH_PROVIDERS, AuthConfig} from 'angular2-jwt';
//pages login
import { LoginPage } from '../pages/login/login';
//pages for examiner
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { ResultsPage } from '../pages/results/results';
import { TestingPage } from '../pages/testing/testing';
import { AddPlayerPage } from '../pages/testing/addPlayer';
import { MainTestPage } from '../pages/main-test/main-test';
import { KingdevickPage } from '../pages/kingdevick/kingdevick';
import { KingDevickCardPage } from '../pages/kingdevickcard/kingdevickcard';
import { DemPage } from '../pages/dem/dem';
import { DemTestCardPage } from '../pages/demtestcard/demtestcard';
import { DemresultcardPage } from '../pages/demresultcard/demresultcard';
import { DemReviewPage } from '../pages/dem-review/dem-review';

//pages for student
import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
import { StudentProfilePage } from '../pages/student-profile/student-profile';
import { StudentResultsPage } from '../pages/student-results/student-results';
//pages for admin
import { AdminTabsPage } from '../pages/admin-tabs/admin-tabs';
//providers
import { AuthService } from '../providers/auth-service'
import { ProfileService } from '../providers/profile-service'
import { TestService } from '../providers/test-service'
import { ResultService } from '../providers/result-service'
import { DataService } from '../providers/data-service'
import { GlobalService } from '../providers/global-service'
import { ToastService } from '../providers/toast-service'
import { KdService } from '../providers/kd-service'
import { DemService } from '../providers/dem-service'
import { Damlev } from '../providers/damlev'
import { Config } from '../providers/config';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '781eeb71'
  }
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    ProfilePage,
    TestingPage,
    AddPlayerPage,
    MainTestPage,
    KingdevickPage,
    KingDevickCardPage,
    DemPage,
    DemTestCardPage,
    DemReviewPage,
    DemresultcardPage,
    ResultsPage,
    StudentTabsPage,
    StudentProfilePage,
    StudentResultsPage,
    AdminTabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    AddPlayerPage,
    MainTestPage,
    KingdevickPage,
    KingDevickCardPage,
    DemPage,
    DemTestCardPage,
    DemReviewPage,
    DemresultcardPage,
    ProfilePage,
    TestingPage,
    ResultsPage,
    StudentTabsPage,
    StudentProfilePage,
    StudentResultsPage,
    AdminTabsPage
  ],
  providers: [AuthService, ProfileService, TestService, ResultService, DataService, GlobalService, KdService, DemService,Damlev, Config, Storage, AuthService, ToastService]
})
export class AppModule {
}
