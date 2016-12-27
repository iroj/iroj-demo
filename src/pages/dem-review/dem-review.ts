import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams , Slides} from 'ionic-angular';
import { DemService } from '../../providers/dem-service';

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
  }

  ionViewDidLoad() {
    console.log('Hello DemReviewPage Page');
  }

}
