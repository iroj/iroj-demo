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

  public disabled = { O: true, S: true, A: true, T: true }

  public lock = true;
  public newErrors = { O: 0, S: 0, A: 0, T: 0 };
  constructor(public navCtrl: NavController, public navParams: NavParams, public demService: DemService) {

    this.card = this.demService.getDEMcard(this.navParams.get('index'));
    console.log(this.card);
    // let newArray = this.card.inputArray;
    // let dataArray = this.card.dataArray;
    // _.map(this.card.logs, function (log) {
    //   switch (log.type) {
    //     case 'omission':
    //       newArray.push('O')
    //     case 'addition':
    //     case 'substitution':
    //     case 'transposition'
    //   }

    // })


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
    else if (this.selectData.length === 2 || this.selectInput.length === 2)
      this.disabled = { O: true, S: false, A: true, T: true };
    else
      this.disabled = { O: true, S: true, A: true, T: true };

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
    this.newErrors.O++;
    this.card.inputArray.splice(this.selectData[0], 0, null)
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }

  addition() {
    this.newErrors.A++;
    console.log(this.card.inputArray);
    console.log(this.selectInput);
    _.pullAt(this.card.inputArray, [this.selectInput[0]]);
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }
  substitution() {
    this.newErrors.S++;
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }

  transposition() {
    this.newErrors.T++;
    this.selectInput = [];
    this.selectData = [];
    this.disabled = { O: true, S: true, A: true, T: true };
  }






  plus(type) {
    switch (type) {
      case "om": {
        this.newErrors.O++;
        break;
      }
      case "su": {
        this.newErrors.S++;
        break;
      }
      case "ad": {
        this.newErrors.A++;
        break;
      }
      case "tr": {
        this.newErrors.T++;
        break;
      }
    }
  }

  minus(type) {
    switch (type) {
      case "om": {
        if (this.newErrors.O != 0)
          this.newErrors.O--;
        break;
      }
      case "su": {
        if (this.newErrors.S != 0)
          this.newErrors.S--;
        break;
      }
      case "ad": {
        if (this.newErrors.A != 0)
          this.newErrors.A--;
        break;
      }
      case "tr": {
        if (this.newErrors.T != 0)
          this.newErrors.T--;
        break;
      }
    }
  }
}
