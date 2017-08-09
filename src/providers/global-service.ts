import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {MediaPlugin} from 'ionic-native';

@Injectable()
export class GlobalService {
  public user: any;

  constructor(public http: Http) {
    console.log('Hello GlobalService Provider');
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  checkFile(fileName) {
    let playable;
    let file = new MediaPlugin(fileName);
     file.init.then(() => {
      playable = true
    }, (err) => {
      console.log(err)
      playable = false
    })

    return playable
  };

}
