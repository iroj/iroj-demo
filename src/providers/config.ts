import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Config {
  // public server = 'http://localhost:3000/'
  public server = 'https://pomona-server.herokuapp.com/'

  constructor() {
  }
  setServer(server) {
    this.server = server;
  }
  getServer() {
    return this.server;
  }
}
