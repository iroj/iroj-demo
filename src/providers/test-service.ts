import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './global-service';
import { Config } from './config';
import { DataService } from './data-service';
import { KdService } from './kd-service';
import { DemService } from './dem-service';

import _ from 'lodash';
@Injectable()
export class TestService {

  public headers: Headers;
  public options: RequestOptions;
  public serverAdd: any;
  public user: any;
  public test: any;

  constructor(public http: Http, public global: GlobalService, public config: Config, public dataService: DataService, public kdService: KdService,public demService: DemService) {
    this.serverAdd = this.config.getServer();
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
  }
  getPlayersList() {
    let link = this.serverAdd + "api/getPlayers";
    this.user = this.global.getUser();
        return this.http.post(link, JSON.stringify({ school: this.user.school }), this.options)
      .map(res => res.json());
  }
  addPlayer(player) {
    let link = this.serverAdd + "api/addPlayer";
    return this.http.post(link, JSON.stringify(player), this.options)
      .map(res => res.json());
  }

  // Test
  beginTEST(test) {
    this.test = test;
  }
  returnTest() {
    return this.test
  }

  saveTest(type) {
    this.user = this.global.getUser();
    if (type == 'KD') {
      this.test.KDresults = this.kdService.getKDResults();
      this.test.examiner = this.user._id;
      console.log('saving test', this.test);
      let link = this.serverAdd + "api/saveTest";
      return this.http.post(link, JSON.stringify(this.test), this.options)
        .map(res => res.json());
    }
       if (type == 'DEM') {
      this.test.DEMresults = this.demService.getDEMresultCards();
      this.test.examiner = this.user._id;
      console.log('saving test', this.test);
      // let link = this.serverAdd + "api/saveTest";
      // return this.http.post(link, JSON.stringify(this.test), this.options)
      //   .map(res => res.json());
    }
  }
}
