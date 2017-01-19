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
  public lock: false;
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
    //left:2, right:4
    if (e.direction === 2) {
      this.inputIndex++
      if (this.lock)
        this.dataIndex++
    }
    else if (e.direction === 4 && this.inputIndex != 0) {
      this.inputIndex--
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
}
