import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import { ToastService } from './toast-service';
import { Damlev } from './damlev';
import { DemCalculator } from './dem-calculator';
@Injectable()
export class DemService {
  public DEMcards = {
    results: {    },
    cards: [
      {
        name: 'DEM A',
        datas: [
          [3, 7, 5, 9, 8, 2, 5, 7, 4, 6],
          [1, 4, 7, 6, 3, 7, 9, 3, 9, 2],
          [4, 5, 2, 1, 7, 5, 3, 7, 4, 8],
          [7, 4, 6, 5, 2, 9, 2, 3, 6, 4]
        ],
        totalErrors: 0,
        errors: {
          O: 0,
          S: 0,
          A: 0,
          T: 0
        },
        inputArray: [],
        dataArray: [
          3, 7, 5, 9, 8, 2, 5, 7, 4, 6, 1, 4, 7, 6, 3, 7, 9, 3, 9, 2, 4, 5, 2, 1, 7, 5, 3, 7, 4, 8, 7, 4, 6, 5, 2, 9, 2, 3, 6, 4],
        time: 0,
        logs: [],
        fileName : ''
      },
      {
        name: 'DEM B',
        datas: [
          [6, 3, 2, 9, 1, 7, 4, 6, 5, 2],
          [5, 3, 7, 4, 8, 4, 5, 2, 1, 7],
          [7, 9, 3, 9, 2, 1, 4, 7, 6, 3],
          [2, 5, 7, 4, 6, 3, 7, 5, 9, 8]
        ],
        totalErrors: 0,
        errors: {
          O: 0,
          S: 0,
          A: 0,
          T: 0
        },
        inputArray: [],
        dataArray: [6, 3, 2, 9, 1, 7, 4, 6, 5, 2, 5, 3, 7, 4, 8, 4, 5, 2, 1, 7, 7, 9, 3, 9, 2, 1, 4, 7, 6, 3, 2, 5, 7, 4, 6, 3, 7, 5, 9, 8],
        time: 0,
        logs: [],
        fileName : ''
      },
      {
        name: 'DEM C',
        datas: [
          [3, 7, 5, 9, 8, 2, 5, 7, 4, 6],
          [1, 4, 7, 6, 3, 7, 9, 3, 9, 2],
          [4, 5, 2, 1, 7, 5, 3, 7, 4, 8],
          [7, 4, 6, 5, 2, 9, 2, 3, 6, 4]
        ],
        totalErrors: 0,
        errors: {
          O: 0,
          S: 0,
          A: 0,
          T: 0
        },
        inputArray: [],
        dataArray: [
          3, 7, 5, 9, 8, 2, 5, 7, 4, 6, 1, 4, 7, 6, 3, 7, 9, 3, 9, 2, 4, 5, 2, 1, 7, 5, 3, 7, 4, 8, 7, 4, 6, 5, 2, 9, 2, 3, 6, 4],
        time: 0,
        logs: [],
        fileName : ''
      }]
  };
  constructor(public http: Http, public toast: ToastService, public damlev: Damlev, public demCalculator:DemCalculator) {
    console.log('Hello DemService Provider');
  }
  // DEM cards
  getDEMcards() {
    return this.DEMcards.cards;
  }
  getDEMcard(i) {
    return this.DEMcards.cards[i]
  }

  getDEMResults() {
    let totalErrors = this.DEMcards.cards[0].totalErrors + this.DEMcards.cards[1].totalErrors
    console.log(totalErrors);
    let results = {
      vt: this.DEMcards.cards[0].time + this.DEMcards.cards[1].time,
      vtE: (this.DEMcards.cards[0].time + this.DEMcards.cards[1].time) / totalErrors,
      gH: this.DEMcards.cards[2].time,

      aht: (this.DEMcards.cards[2].time * 80) / (80 - this.DEMcards.cards[2].totalErrors),
      hV: (this.DEMcards.cards[2].time * 80) / (80 - this.DEMcards.cards[2].totalErrors) / this.DEMcards.cards[0].time + this.DEMcards.cards[1].time
    }
    this.DEMcards.results = results;

    return this.DEMcards.results;
  }
  resetDEMcards() {
    _.forEach(this.DEMcards.cards, function (x) {
      x.errors.O = 0;
      x.errors.S = 0;
      x.errors.A = 0;
      x.errors.T = 0;
      x.totalErrors = 0;
      x.inputArray = [];
      x.logs = [];
      x.time = 0;
      x.fileName=''
    })
  }
  getDEMresultCards() {
    return this.DEMcards
  }
  setDEMresultCards(cards) {
    this.DEMcards = cards
  }
  analyze(selectedcard, cardIndex) {
    this.toast.showToast('Analysing data');
    let  inputArray= selectedcard.dataArray;
    let dataArray = selectedcard.inputArray;

    let source = inputArray.join('');
    let target = dataArray.join('');
    selectedcard.errors =   this.demCalculator.calculateErrors(source,target);
    selectedcard.totalErrors = selectedcard.errors.O+selectedcard.errors.S+selectedcard.errors.A+selectedcard.errors.T;
    console.log('total errors', selectedcard.totalErrors);

    this.DEMcards.cards[cardIndex] = selectedcard;
    return selectedcard
  }

  updateDEMresultcard(card, i){
    this.DEMcards.cards[i] = card;
  }

}
