import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DemCalculator {

  constructor(public http: Http) {
    console.log('Hello DemCalculator Provider');
  }

  deepCopy(oldObj) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }
  distance = function () {

    this.A = 0;
    this.O = 0;
    this.S = 0;
    this.T = 0;
    this.insertion = function () {
      this.A++;
    }
    this.deletion = function () {
      this.O++;
    }
    this.substitution = function () {
      this.S++;
    }
    this.transposition = function () {
      this.T++;
    }
    this.getDistance = function () {
      return this.A + this.O + this.S + this.T;
    }

    this.getInsertion = function () {
      return this.A
    }
    this.setInsertion = function (insertion) {
      this.A = insertion;
    }

    this.setDeletion = function (deletion) {
      this.O = deletion;
    }

    this.getDeletion = function () {
      return this.O
    }

    this.getSubstitution = function () {
      return this.S;
    }

    this.getTransposition = function () {
      return this.T
    }

  }
  calculateErrors(s, t) {
    if (!s) {
      var tmp = new this.distance();
      tmp.setInsertion(t.length);
      return tmp;
    } else if (!t) {
      var tmp = new this.distance();
      tmp.setDeletion(s.length);
      return tmp;
    }
    var m = s.length;
    var n = t.length;

    var d = new Array();
    for (var i = 0; i <= m; i++) {
      d[i] = new Array();
      d[i][0] = new this.distance();
      d[i][0].setInsertion(i)
    }
    for (var j = 0; j <= n; j++) {
      d[0][j] = new this.distance();
      d[0][j].setDeletion(j);
    }
    var cost = 0;
    for (var j = 1; j <= n; j++) {
      for (var i = 1; i <= m; i++) {
        var tempDistance = new this.distance();
        cost = (s.charAt(i - 1) == t.charAt(j - 1)) ? 0 : 1;
        if (d[i - 1][j - 1].getDistance() + cost < d[i - 1][j].getDistance() + 1) {
          if (cost === 1) {
            tempDistance = this.deepCopy(d[i - 1][j - 1]);
            tempDistance.substitution();
          } else {
            tempDistance = this.deepCopy(d[i - 1][j - 1]);
          }
        } else {
          tempDistance = this.deepCopy(d[i - 1][j]);
          tempDistance.deletion();
        }
        if (d[i][j - 1].getDistance() + 1 < tempDistance.getDistance()) {
          var temp = this.deepCopy(d[i][j - 1]);
          temp.insertion();
          d[i][j] = this.deepCopy(temp);
        } else {
          d[i][j] = this.deepCopy(tempDistance);
        }
        if (i > 1 && j > 1 && s.charAt(i - 1) == t.charAt(j - 2) && s.charAt(i - 2) == t.charAt(j - 1)) {
          if (d[i][j].getDistance() < d[i - 2][j - 2].getDistance() + cost) {
            d[i][j] = this.deepCopy(d[i][j])
          } else {
            var transtmp = this.deepCopy(d[i - 2][j - 2]);
            transtmp.transposition();
            d[i][j] = this.deepCopy(transtmp);
          }
        }
      }
    }
    return d[m][n];
  }
}



