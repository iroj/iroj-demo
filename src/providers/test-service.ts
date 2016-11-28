import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalService } from './global-service';
import {DataService} from './data-service';

@Injectable()
export class TestService {

  public headers: Headers;
  public options: RequestOptions;
  public serverAdd: any;
  public user: any;
  public test:any;
  constructor(public http: Http, public global: GlobalService, public dataService: DataService) {
    this.serverAdd = this.global.getServer();
    this.user = this.global.getUser();
  }
  getPlayersList(){
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    let link = this.serverAdd + "api/getPlayers";
    return this.http.post(link, JSON.stringify({school:this.user.school}), this.options)
      .map(res => res.json());
  }
  addPlayer(player){
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    let link = this.serverAdd + "api/addPlayer";
    return this.http.post(link, JSON.stringify(player), this.options)
      .map(res => res.json());
  }

  beginTEST(test){
    this.test = test;
  }
  
}
