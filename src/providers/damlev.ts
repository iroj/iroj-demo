import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Damlev {
  public sourceCodes:number[];
  public targetCodes:number[];
  public score:number[];
  constructor(public http: Http) {
    console.log('Hello Damlev Provider');
  }
  uncache() {
    this.sourceCodes = new Array(40);
    this.targetCodes = new Array(40);
    this.score = new Array(40 * 40);
  }

  growArray(arr: number[], size: number) {
    if (size <= arr.length) {
      return arr;
    }

    var target = arr.length;
    while (target < size) {
      target *= 2;
    }
    console.log('target ', target)
    return new Array(target);
  }

  damlev(source: string, target: string) {
    // If one of the strings is blank, returns the length of the other (the
    // cost of the n insertions)
    this.uncache();
    console.log('source', source)
    console.log('target', target);
    if (!source) {
      return target.length;
    } else if (!target) {
      return source.length;
    }

    const sourceLength = source.length;
    const targetLength = target.length;
    let i: number;
    console.log('SL: ', sourceLength)
    console.log('TL: ', targetLength)
    // Initialize a char code cache array
    this.sourceCodes = this.growArray(this.sourceCodes, sourceLength);
    this.targetCodes = this.growArray(this.targetCodes, targetLength);
    for (i = 0; i < sourceLength; i++) { this.sourceCodes[i] = source.charCodeAt(i); }
    for (i = 0; i < targetLength; i++) { this.targetCodes[i] = target.charCodeAt(i); }
    console.log('SC: ', this.sourceCodes)
    console.log('TC: ', this.targetCodes)


    // Initialize the scoring matrix
    const INF = sourceLength + targetLength;
    const rowSize = sourceLength + 1;
    this.score = this.growArray(this.score, (sourceLength + 1) * (targetLength + 1));
    this.score[0] = INF;

    for (i = 0; i <= sourceLength; i++) {
      this.score[(i + 1) * rowSize] = INF;
      this.score[(i + 1) * rowSize + 1] = i;
    }

    for (i = 0; i <= targetLength; i++) {
      this.score[i] = INF;
      this.score[1 * rowSize + i + 1] = i;
    }

    // Run the damlev algorithm
    let chars: { [key: string]: number } = {};
    let j: number, DB: number, i1: number, j1: number, j2: number, newScore: number;
    for (i = 1; i <= sourceLength; i += 1) {
      DB = 0;
      for (j = 1; j <= targetLength; j += 1) {
        i1 = chars[this.targetCodes[j - 1]] || 0;
        j1 = DB;

        if (this.sourceCodes[i - 1] == this.targetCodes[j - 1]) {
          newScore = this.score[i * rowSize + j];
          DB = j;
        } else {
          newScore = Math.min(this.score[i * rowSize + j], Math.min(this.score[(i + 1) * rowSize + j], this.score[i * rowSize + j + 1])) + 1;
        }

        this.score[(i + 1) * rowSize + j + 1] = Math.min(newScore, this.score[i1 * rowSize + j1] + (i - i1) + (j - j1 - 1));
      }
      chars[this.sourceCodes[i - 1]] = i;
    }
    console.log('score: ', this.score)
    console.log((sourceLength + 1) * rowSize + targetLength + 1)
    return this.score[(sourceLength + 1) * rowSize + targetLength + 1];
  }
}

