import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
public user : any;
  constructor(public http: Http) {
    console.log('Hello GlobalService Provider');
  }
     setUser(user) {
        this.user = user;
    }
    getUser() {
        return this.user;
    }

}
