import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultService } from '../../providers/result-service';
import _ from 'lodash';
import moment from 'moment';
@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  public results = [];

  constructor(public navCtrl: NavController, public resultService: ResultService) {
    this.resultService.getResultsExaminer().subscribe(data => {
      console.log(data);
      this.results = _.forEach(data, function (x) {
        x.created = moment(x.created).format('DD MMM YYYY')
        x.type=x.type.charAt(0)
      });
    })

  }
  ionViewDidLoad() {
   this.resultService.getResultsExaminer().subscribe(data => {
      console.log(data);
      this.results = _.forEach(data, function (x) {
        x.created = moment(x.created).format('DD MMM YYYY')
        x.type=x.type.charAt(0)
      });
    })

  }

}
