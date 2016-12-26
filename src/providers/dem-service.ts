import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import { ToastService } from './toast-service';

@Injectable()
export class DemService {
  public DEMcards = {
    results: {

    },
    cards: [
      {
        name: 'DEM A',
        datas: [
          [3, 7, 5, 9, 8, 2, 5, 7, 4, 6],
          [1, 4, 7, 6, 3, 7, 9, 3, 9, 2],
          [4, 5, 2, 1, 7, 5, 3, 7, 4, 8],
          [7, 4, 6, 5, 2, 9, 2, 3, 6, 4]
        ],
        errors: {
          O: 0,
          S: 0,
          A: 0,
          T: 0
        },
        inputArray: [],
        dataArray: [
          3, 7, 5, 9, 8, 2, 5, 7, 4, 6, 1, 4, 7, 6, 3, 7, 9, 3, 9, 2, 4, 5, 2, 1, 7, 5, 3, 7, 4, 8, 7, 4, 6, 5, 2, 9, 2, 3, 6, 4],
        time: 0
      },
      {
        name: 'DEM B',
        datas: [
          [6, 3, 2, 9, 1, 7, 4, 6, 5, 2],
          [5, 3, 7, 4, 8, 4, 5, 2, 1, 7],
          [7, 9, 3, 9, 2, 1, 4, 7, 6, 3],
          [2, 5, 7, 4, 6, 3, 7, 5, 9, 8]
        ],
        errors: {
          O: 0,
          S: 0,
          A: 0,
          T: 0
        },
        inputArray: [],
        dataArray: [6, 3, 2, 9, 1, 7, 4, 6, 5, 2, 5, 3, 7, 4, 8, 4, 5, 2, 1, 7, 7, 9, 3, 9, 2, 1, 4, 7, 6, 3, 2, 5, 7, 4, 6, 3, 7, 5, 9, 8],
        time: 0
      },
      {
        name: 'DEM C',
        datas: [
          [3, 7, 5, 9, 8, 2, 5, 7, 4, 6],
          [1, 4, 7, 6, 3, 7, 9, 3, 9, 2],
          [4, 5, 2, 1, 7, 5, 3, 7, 4, 8],
          [7, 4, 6, 5, 2, 9, 2, 3, 6, 4]
        ],
        errors: {
          O: 0,
          S: 0,
          A: 0,
          T: 0
        },
        inputArray: [],
        dataArray: [
          3, 7, 5, 9, 8, 2, 5, 7, 4, 6, 1, 4, 7, 6, 3, 7, 9, 3, 9, 2, 4, 5, 2, 1, 7, 5, 3, 7, 4, 8, 7, 4, 6, 5, 2, 9, 2, 3, 6, 4],
        time: 0
      }]
  };
  constructor(public http: Http, public toast: ToastService) {
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
    let totalErrors = _.sum(_.map(this.DEMcards.cards, function (x) {
      return x.errors.O + x.errors.A + x.errors.T + x.errors.S
    }))

    console.log(totalErrors);
    let results = {
      vt: this.DEMcards.cards[0].time + this.DEMcards.cards[1].time,
      vtE: this.DEMcards.cards[0].time + this.DEMcards.cards[1].time / totalErrors,
      gH: this.DEMcards.cards[2].time,
      aht: (this.DEMcards.cards[2].time * 80) / (80 - this.DEMcards.cards[2].errors.O + this.DEMcards.cards[2].errors.A),
      hV:(this.DEMcards.cards[2].time * 80) / (80 - this.DEMcards.cards[2].errors.O + this.DEMcards.cards[2].errors.A) / this.DEMcards.cards[0].time + this.DEMcards.cards[1].time
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
      x.time = 0
    })
  }
  setDEMcard(card, i) {

  }
  // getDEMResults() {
  //   let results = _.map(this.DEMcards.cards, function (x) {
  //     return { errors: x.errors, time: x.time, name: x.name }
  //   })
  //   return results
  // }

  analyze(selectedcard, cardIndex) {
    this.toast.showToast('Analysing data')
    let inputIndex = 0;
    let dataIndex = 0;
    let dataArray = selectedcard.dataArray;
    let inputArray = selectedcard.inputArray;
    let errors = selectedcard.errors;
    let i = 0;
    _.forEach(dataArray, function (x) {
      if (inputArray[inputIndex] === dataArray[dataIndex])
        console.log(inputArray[inputIndex], dataArray[dataIndex])
      else {
        // Addition and Transposition
        if (dataArray[dataIndex] == inputArray[inputIndex + 1]) {
          if (dataArray[dataIndex + 1] == inputArray[inputIndex]) {
            // Transposition
            console.log(dataArray[dataIndex] + " And " + dataArray[dataIndex + 1] + " are transpositioned");
            dataIndex++;
            inputIndex++;
            i++;
            errors.T++;
          } else {
            // Addition
            console.log(inputArray[inputIndex] + " is addition");
            console.log(dataArray[dataIndex] + " is Equals to " + inputArray[inputIndex + 1]);
            inputIndex++;
            errors.A++;
          }
        } else {
          if (dataArray[dataIndex + 1] == inputArray[inputIndex + 1]) {
            // Substitution
            console.log(dataArray[dataIndex] + " is substituted with " + inputArray[inputIndex]);
            errors.S++;
          }
        }

        // Omission
        if (dataArray[dataIndex + 1] == inputArray[inputIndex]) {
          console.log(dataArray[dataIndex] + " is Omitted");
          // After Omission compare next item to the previous item of next Array B
          inputIndex -= 1;
          errors.O++;
        }
      }
      inputIndex++;
      dataIndex++;
    })
    console.log(errors);
    selectedcard.errors = errors;
    this.DEMcards.cards[cardIndex] = selectedcard;
    return selectedcard
  }

}
