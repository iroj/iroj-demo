import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { DemService } from '../../providers/dem-service';
import _ from 'lodash';
@Component({
  selector: 'page-dem-review',
  templateUrl: 'dem-review.html'
})
export class DemReviewPage {
  @ViewChild('myslider') mySlider: Slides;
  public card: any;
  public mySlideOptions = {
    initialSlide: 0
  };
  public inputIndex = 0;
  public dataIndex = 0;
  public selectInput = [];
  public selectData = [];
  public additionArray = [];
  public disabled: any;
  public lock = true;
  public newErrors: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public demService: DemService) {
    this.reset();
  }

  swiped(e) {
    console.log(e.direction);
    if (e.direction === 2)
      this.swipeLeft();
    else
      this.swipeRight()
  }
  swipeLeft() {
    if (this.inputIndex != this.card.inputArray.length) {
      this.inputIndex++
      if (this.lock && this.dataIndex != this.card.dataArray.length)
        this.dataIndex++
    }
  }
  swipeRight() {
    if (this.inputIndex != 0) {
      this.inputIndex--;
      if (this.lock && this.dataIndex != 0)
        this.dataIndex--
    }
  }
  ionViewDidLoad() {
    console.log('Hello DemReviewPage Page');
  }
  back() {
    this.card.errors = _.mapValues(this.newErrors, function (o) { return o.err; });
    console.log(_.map(this.card.errors, function(x){return x}))
    this.card.totalErrors = _.sum(_.map(this.card.errors, function(x){return x}))
    console.log(this.card);
    this.demService.updateDEMresultcard(this.card, this.navParams.get('index'));
    this.navCtrl.pop();

  }

  selectedInput(x) {
    if (this.selectInput.length === 0) {
      this.selectInput.push(x)
    }
    else if (this.selectInput.length === 1) {
      if (this.selectInput.indexOf(x) > -1)
        _.pullAt(this.selectInput, [this.selectInput.indexOf(x)])
      else if (x + 1 === this.selectInput[0] || x - 1 === this.selectInput[0]) {
        this.selectInput.push(x)
      }
    }
    else if (this.selectInput.indexOf(x) > -1)
      _.pullAt(this.selectInput, [this.selectInput.indexOf(x)])

    this.enableButtons()

  }
  enableButtons() {
    console.log(this.selectInput)
    console.log(this.selectData)

    if (this.selectData.length === 1 && this.selectInput.length === 0)
      this.disabled = { O: false, S: true, A: true, T: true };
    else if (this.selectData.length === 0 && this.selectInput.length === 1)
      this.disabled = { O: true, S: true, A: false, T: true };
    else if (this.selectData.length === 1 && this.selectInput.length === 1)
      this.disabled = { O: true, S: false, A: true, T: true };
    else if (this.selectData.length === 2 && this.selectInput.length === 2)
      this.disabled = { O: true, S: true, A: true, T: false };
    else
      this.disabled = { O: true, S: true, A: true, T: true };


    console.log(this.newErrors)
  }
  selectedData(x) {
    if (this.selectData.length === 0) {
      this.selectData.push(x)
    }
    else if (this.selectData.length === 1) {
      if (this.selectData.indexOf(x) > -1)
        _.pullAt(this.selectData, [this.selectData.indexOf(x)])
      else if (x + 1 === this.selectData[0] || x - 1 === this.selectData[0]) {
        this.selectData.push(x)
      }
    }
    else if (this.selectData.indexOf(x) > -1)
      _.pullAt(this.selectData, [this.selectData.indexOf(x)])
    this.enableButtons()

  }


  omission() {
    this.newErrors.O.err++;
    this.newErrors.O.indices.push(this.selectData[0])
    this.card.inputArray.splice(this.selectData[0], 0, this.card.dataArray[this.selectData[0]] + 'omit')
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }

  addition() {
    this.newErrors.A.err++;
    this.newErrors.A.indices.push(this.selectInput[0])

    this.additionArray[this.selectInput[0]] = this.card.inputArray[this.selectInput[0]] + ' add';
    console.log(this.additionArray)
    console.log(this.card.inputArray);
    console.log(this.selectInput);
    _.pullAt(this.card.inputArray, [this.selectInput[0]]);
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }
  substitution() {
    this.newErrors.S.err++;
    this.newErrors.S.indices.push(this.selectInput[0])
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }

  transposition() {
    this.newErrors.T.err++;
    this.newErrors.T.indices.push(this.selectData[0])
    this.newErrors.T.indices.push(this.selectData[1])
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }


  reset() {
    this.newErrors = {
      O: {
        err: 0,
        indices: []
      }, S: {
        err: 0,
        indices: []
      }, A: {
        err: 0,
        indices: []
      }, T: {
        err: 0,
        indices: []
      }
    };
    this.disabled = { O: true, S: true, A: true, T: true };
    this.selectInput = [];
    this.selectData = [];
    this.card = this.demService.getDEMcard(this.navParams.get('index'));
    console.log(this.card);
    this.additionArray = _.map(this.card.inputArray, function (x) {
      return null
    })
  }
}
