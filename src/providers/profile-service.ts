import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Config } from './config';

@Injectable()
export class ProfileService {
 public headers: Headers;
  public options: RequestOptions;
  public serverAdd: any;
  constructor(public http: Http, public config:Config) {
    this.serverAdd = this.config.getServer();
  }

updateProfile(user){
  this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    let link = this.serverAdd + "api/updateProfile";
    return this.http.post(link, JSON.stringify(user), this.options)
      .map(res => res.json());

}

getSchools(){
   this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    let link = this.serverAdd + "api/getSchools";
    return this.http.post(link, this.options)
      .map(res => res.json());

}
}
