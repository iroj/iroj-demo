import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './global-service';
import { Config } from './config';
import { DataService } from './data-service';
import _ from 'lodash'
@Injectable()
export class TestService {

  public headers: Headers;
  public options: RequestOptions;
  public serverAdd: any;
  public user: any;
  public test: any;
  public KDcards = [{
    name: 'KD CARD 1',
    row1: [5, 4, 8, 7, 1],
    row2: [4, 0, 9, 3, 2],
    row3: [6, 8, 1, 5, 9],
    row4: [7, 2, 0, 8, 4],
    row5: [3, 9, 7, 1, 5],
    row6: [0, 4, 5, 7, 3],
    row7: [9, 2, 8, 5, 4],
    row8: [6, 1, 0, 9, 2],
    errors: 0,
    time: 0
  },
  {
    name: 'KD CARD 2',

    row1: [7, 1, 8, 3, 5],
    row2: [8, 5, 4, 0, 9],
    row3: [2, 9, 1, 5, 6],
    row4: [5, 4, 7, 9, 2],
    row5: [0, 8, 5, 1, 4],
    row6: [3, 2, 9, 4, 7],
    row7: [9, 0, 8, 6, 1],
    row8: [4, 5, 3, 2, 0],
    errors: 0,
    time: 0
  },
  {
    name: 'KD CARD 3',

    row1: [2, 4, 8, 3, 1],
    row2: [7, 0, 6, 5, 2],
    row3: [1, 3, 9, 4, 0],
    row4: [8, 2, 7, 0, 5],
    row5: [5, 8, 6, 9, 7],
    row6: [4, 0, 2, 5, 3],
    row7: [9, 6, 3, 1, 8],
    row8: [7, 9, 5, 4, 6],
    errors: 0,
    time: 0
  }]
  constructor(public http: Http, public global: GlobalService, public config: Config, public dataService: DataService) {
    this.serverAdd = this.config.getServer();
    this.user = this.global.getUser();
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
  }
  getPlayersList() {
    let link = this.serverAdd + "api/getPlayers";
    return this.http.post(link, JSON.stringify({ school: this.user.school }), this.options)
      .map(res => res.json());
  }
  addPlayer(player) {
    let link = this.serverAdd + "api/addPlayer";
    return this.http.post(link, JSON.stringify(player), this.options)
      .map(res => res.json());
  }
  // KD cards
  getKDcards() {
    return this.KDcards;
  }
  getKDcard(i) {
    return this.KDcards[i]
  }
  setKDcard(card, i) {
    this.KDcards[i] = card;
  }
  resetKDcards(){
    _.forEach(this.KDcards, function(x){
      x.errors=0;
      x.time=0
    })
  }
  // Test
  beginTEST(test) {
    this.test = test;
  }
  returnTest() {
    return this.test
  }
  prepareTest(type) {
    if (type == 'KD') {
      this.test.KDresults = _.map(this.KDcards, function (x) {
        return { err: x.errors, time: x.time, name: x.name }
      })
    }
    this.test.examiner = this.user._id;
    return true
  }
  saveTest(){
    console.log('saving test', this.test);
    let link = this.serverAdd + "api/saveTest";
    return this.http.post(link, JSON.stringify(this.test), this.options)
      .map(res => res.json());
  }
}
