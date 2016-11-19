import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalService } from './global-service';
import {DataService} from './data-service';

@Injectable()
export class AuthService {

  public headers: Headers;
  public options: RequestOptions;
  public serverAdd: any;
  public user: any;
  constructor(public http: Http, public global: GlobalService, public dataService: DataService) {

    this.serverAdd = this.global.getServer();
    this.user = this.global.getUser();
  }
  login(loginCred) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    let link = this.serverAdd + "api/login";
    return this.http.post(link, JSON.stringify(loginCred), this.options)
      .map(res => res.json());
  }

    signup(signupCred) {
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    let link = this.serverAdd + "api/signup";
    return this.http.post(link, JSON.stringify(signupCred), this.options)
      .map(res => res.json());
  }
}
