import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultService } from '../../providers/result-service';
import { DemresultcardPage } from '../demresultcard/demresultcard';

import _ from 'lodash';
import moment from 'moment';
@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  public results = { kd: [], dem: [] };
  public type = 'KD';

  constructor(public navCtrl: NavController, public resultService: ResultService) {
    this.getResults();

  }
  ionViewWillEnter() {
    this.getResults();
  }

  ionViewWillLeave() {
  }
  getResults() {
    this.resultService.getResultsExaminer().subscribe(data => {
      _.forEach(data, function (x) {
        x.created = moment(x.created).format('DD/MM/YYYY')
        x.type = x.type.charAt(0)
      });
      this.results.kd = _.filter(data, function (x) { return x.KDresults.length > 0 })
      this.results.dem = _.filter(data, function (x) { return x.DEMresults })
      console.log(this.results);
    })
  }
  review(result){
    this.navCtrl.push(DemresultcardPage, {result: result})
  }
}
