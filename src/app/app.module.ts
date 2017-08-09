import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

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
import { DemInputPage } from '../pages/dem-input/dem-input';
import { CognitionToolPage } from '../pages/cognition-tool/cognition-tool';
import { EmergencyPage } from '../pages/emergency/emergency';
import { EmergencyAlertModal } from '../pages/emergency/emergency-alert';
//native services
import {Camera} from '@ionic-native/camera';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MediaPlugin} from '@ionic-native/media';
import {File} from '@ionic-native/file';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import { StatusBar} from '@ionic-native/status-bar';

//pages for student
import { StudentTabsPage } from '../pages/student-tabs/student-tabs';
import { StudentProfilePage } from '../pages/student-profile/student-profile';
import { StudentResultsPage } from '../pages/student-results/student-results';
//pages for admin
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
import { DemCalculator } from '../providers/dem-calculator';
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
    DemInputPage,
    DemresultcardPage,
    CognitionToolPage,
    EmergencyPage,
    EmergencyAlertModal,
    ResultsPage,
    StudentTabsPage,
    StudentProfilePage,
    StudentResultsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    BrowserModule, HttpModule

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
    DemInputPage,
    DemresultcardPage,
    CognitionToolPage,
    EmergencyPage,
    EmergencyAlertModal,
    ProfilePage,
    TestingPage,
    ResultsPage,
    StudentTabsPage,
    StudentProfilePage,
    StudentResultsPage
  ],
  providers: [AuthService, ProfileService, TestService, ResultService, DataService, GlobalService, KdService, DemService, Damlev, DemCalculator, Config, Storage, AuthService, ToastService,
  Camera, SplashScreen, File,StatusBar, MediaPlugin, ScreenOrientation, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {
}
