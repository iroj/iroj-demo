import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from './config';
import { DataService } from './data-service';

@Injectable()
export class AuthService {

  public headers: Headers;
  public options: RequestOptions;
  public serverAdd: any;
  constructor(public http: Http, public config: Config, public dataService: DataService) {
    this.serverAdd = this.config.getServer();
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
  }
  login(loginCred) {
    let link = this.serverAdd + "api/login";
    return this.http.post(link, JSON.stringify(loginCred), this.options)
      .map(res => res.json());
  }

  signup(signupCred) {
      let link = this.serverAdd + "api/signup";
      return this.http.post(link, JSON.stringify(signupCred), this.options)
        .map(res => res.json());
  }


}
