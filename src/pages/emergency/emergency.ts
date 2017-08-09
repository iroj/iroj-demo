import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import {EmergencyAlertModal} from './emergency-alert'
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage {
  public questions = [
    [
      {
        q: 'Did the person have a SEIZURE?',
        value: false
      },
      {
        q: 'Was the person ever UNCONCIOUS?',
        value: false
      },
      {
        q: 'Does the person have a headache that is the WORST EVER?',
        value: false
      },
      {
        q: 'Does the person have a SEVER NECK PAIN?',
        value: false
      },
      {
        q: 'Does the person feel comfortable attempting to move his/her neck to right and left?If the person starts to feel any pain, STOP IMMEDIATELY and answer NO.',
        value: true
      }],
    [
      {
        q: 'Is there numbeness in the face, arms and/or legs?',
        value: false
      },
      {
        q: 'Is the person vomiting repeteadly?',
        value: false
      },
      {
        q: 'Is the person having difficulty talking(slurring his/her words)?',
        value: false
      },
      {
        q: 'Is the person having difficulty walking?',
        value: false
      },
      {
        q: 'Is the person experiencing confusion that is not improving?',
        value: false
      },
      {
        q: 'Is the person behaving unsusually?',
        value: false
      }
    ], [
      {
        q: 'Is the person having memory problems that is not improving?',
        value: false
      },
      {
        q: 'Is the person very drowsy, cannot be awakened?',
        value: false
      },
      {
        q: 'Is the person restless?',
        value: false
      },
      {
        q: 'Is the person 65 years or older?',
        value: false
      },
      {
        q: 'Is the person intoxicated?',
        value: false
      },
      {
        q: 'Is the person taking blood thinner medicine?',
        value: false
      },
      {
        q: "Is the person's initial symptom(s) worsening?",
        value: false
      },
      {
        q: "Are the person's pupils the same size?",
        value: true
      }



    ]
  ];
  public qIndex = 0;
  public stepIndex = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modal:ModalController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyPage');
  }
  back() {
    this.navCtrl.pop();
  }
  next(value) {
    console.log(value)
    if (value === true)
      if (this.qIndex < this.questions[this.stepIndex].length - 1)
        this.qIndex++
      else {
        if (this.stepIndex < this.questions.length - 1) {
          this.stepIndex++
          this.qIndex = 0;
        }
        else {
          console.log('safe')
          this.navCtrl.pop();
        }
      }
    else {
      console.log('danger danger')
      let modal = this.modal.create(EmergencyAlertModal);
      modal.present();
      modal.onDidDismiss(data => {
        this.navCtrl.pop()
      })
    }
  }
}
