import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultService } from '../../providers/result-service';
import { ScreenOrientation } from 'ionic-native';

import _ from 'lodash';
import moment from 'moment';


@Component({
  selector: 'page-student-results',
  templateUrl: 'student-results.html'
})
export class StudentResultsPage {
  public results = { kd: [], dem: [] };
  public type = 'KD';
  constructor(public navCtrl: NavController, public resultService: ResultService) { }
 ionViewWillEnter() {
    ScreenOrientation.lockOrientation('landscape');
    this.getResults();
  }

  ionViewWillLeave() {
    ScreenOrientation.unlockOrientation();
  }
  getResults() {
    this.resultService.getResultsStudent().subscribe(data => {
      _.forEach(data, function (x) {
        x.created = moment(x.created).format('DD/MM/YYYY')
        x.type = x.type.charAt(0)
      });
      this.results.kd = _.filter(data, function (x) { return x.KDresults.length > 0 })
      this.results.dem = _.filter(data, function (x) { return x.DEMresults })
      console.log(this.results);
    })
  }

}
