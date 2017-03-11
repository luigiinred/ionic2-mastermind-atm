import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-solution',
  templateUrl: 'solution.html'
})
export class SolutionPage {


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private alertCtrl: AlertController) {
  }
  close() {
    this.viewCtrl.dismiss();
  }
  deposit() {

    let alert = this.alertCtrl.create({
      title: 'Please deposit $5',

      buttons: ['Dismiss']
    });
    alert.present();
  }

  withdraw() {
    let alert = this.alertCtrl.create({
      title: 'Insufficient funds.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
