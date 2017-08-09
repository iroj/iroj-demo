import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './global-service';
import { Config } from './config';
@Injectable()
export class ResultService {
  public headers: Headers;
  public options: RequestOptions;
  public serverAdd: any;
  public user: any;
  constructor(public http: Http, public config: Config, public global: GlobalService) {
    this.serverAdd = this.config.getServer();
    this.user = this.global.getUser();
    this.headers = new Headers({
      'Content-Type': 'application/json'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
  }
  getResultsExaminer() {
    let link = this.serverAdd + "api/getResultsExaminer";
    return this.http.post(link, JSON.stringify({ examiner: this.user._id }), this.options)
      .map(res => res.json());
  }
  getResultsStudent() {
    let link = this.serverAdd + "api/getResultsStudent";
    return this.http.post(link, JSON.stringify({ student: this.user._id }), this.options)
      .map(res => res.json());
  }
}
