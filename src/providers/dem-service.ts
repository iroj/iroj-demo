import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import _ from 'lodash';
import { ToastService } from './toast-service';
import { Damlev } from './damlev';
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
        logs: []
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
        logs: []
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
        logs: []
      }]
  };
  constructor(public http: Http, public toast: ToastService, public damlev: Damlev) {
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
      x.time = 0
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

    // damlev service
    let source = inputArray.join('');
    let target = dataArray.join('');
    selectedcard.totalErrors = this.damlev.damlev(source, target);
    console.log('total errors', selectedcard.totalErrors);

    // OSAT model

    let inputIndex = 0;
    let dataIndex = 0;
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
            selectedcard.logs.push({
              type: 'transposition',
              index : inputIndex
            })
            console.log(dataArray[dataIndex] + " And " + dataArray[dataIndex + 1] + " are transpositioned");
            dataIndex++;
            inputIndex++;
            i++;
            errors.T++;
            console.log(errors);
          } else {
            // Addition
            console.log(inputArray[inputIndex] + " is addition");
             selectedcard.logs.push({
              type: 'addition',
              index : inputIndex
            })

            inputIndex++;
            errors.A++;
            console.log(errors);
          }
        } else {
          if (dataArray[dataIndex + 1] == inputArray[inputIndex + 1]) {
            // Substitution
             selectedcard.logs.push({
              type: 'substitution',
              index : inputIndex
            })
            console.log(dataArray[dataIndex] + " is substituted with " + inputArray[inputIndex]);
            errors.S++;
            console.log(errors);
          }
        }

        // Omission
        if (dataArray[dataIndex + 1] == inputArray[inputIndex]) {
          console.log(dataArray[dataIndex] + " is Omitted");
          selectedcard.logs.push({
              type: 'ommission',
              index : inputIndex
            })
          // After Omission compare next item to the previous item of next Array B
          inputIndex -= 1;
          errors.O++;
          console.log(errors);
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

  updateDEMresultcard(card, i){
    this.DEMcards.cards[i] = card;
  }

}
