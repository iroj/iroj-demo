import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {Storage} from '@ionic/storage'

//pages login
import {LoginPage} from '../pages/login/login';
//pages for examiner
import {TabsPage} from '../pages/tabs/tabs';
import {ProfilePage} from '../pages/profile/profile';
import {ResultsPage} from '../pages/results/results';
import {TestingPage} from '../pages/testing/testing';
import {AddPlayerPage} from '../pages/testing/testing';
import {BaselinePage} from '../pages/baseline/baseline';
import {ConcussionPage} from '../pages/concussion/concussion';
import {KingdevickPage} from '../pages/kingdevick/kingdevick';
import {TestCardPage} from '../pages/kingdevick/kingdevick';
import {DemPage} from '../pages/dem/dem';

//pages for student
import {StudentTabsPage} from '../pages/student-tabs/student-tabs';
import {StudentProfilePage} from '../pages/student-profile/student-profile';
import {StudentResultsPage} from '../pages/student-results/student-results';
//pages for admin
import {AdminTabsPage} from '../pages/admin-tabs/admin-tabs';
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
    AddPlayerPage,
    BaselinePage,
    ConcussionPage,
    KingdevickPage,
    TestCardPage,
    DemPage,
    ResultsPage,
    StudentTabsPage,
    StudentProfilePage,
    StudentResultsPage,
    AdminTabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    AddPlayerPage,  
    BaselinePage,
    ConcussionPage,
    KingdevickPage,
    TestCardPage,
    DemPage,  
    ProfilePage,
    TestingPage,
    ResultsPage,
    StudentTabsPage,
    StudentProfilePage,
    StudentResultsPage,
    AdminTabsPage
  ],
  providers: [AuthService, ProfileService, TestService, ResultService, DataService, GlobalService, Storage]
})
export class AppModule {
}
