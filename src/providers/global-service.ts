import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
public server: any;
public user : any;
  constructor(public http: Http) {
    console.log('Hello GlobalService Provider');
  }
setServer(server) {
        this.server = server;
    }
    getServer() {
        return this.server;
    }

     setUser(user) {
        this.user = user;
    }
    getUser() {
        return this.user;
    }

}
