import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams , Slides} from 'ionic-angular';
import { DemService } from '../../providers/dem-service';
import _ from 'lodash';
@Component({
  selector: 'page-dem-review',
  templateUrl: 'dem-review.html'
})
export class DemReviewPage {
  @ViewChild('dataSlider') dataSlider: Slides;
  @ViewChild('inputSlider') inputSlider: Slides;
public card: any;
public  mySlideOptions = {
    initialSlide: 1
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public demService: DemService) {

   this.card = this.demService.getDEMcard(this.navParams.get('index'));
   console.log(this.card);
let newArray =this.card.inputArray;
let dataArray =this.card.dataArray;
   _.map(this.card.logs, function(log){
switch (log.type){
  case 'omission':
  newArray.push('O')
  case 'addition':
  case 'substitution':
  case 'transposition':



}

   })


  }

  ionViewDidLoad() {
    console.log('Hello DemReviewPage Page');
  }

}
