import { Component } from '@angular/core';

import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-solution',
  templateUrl: 'solution.html'
})
export class SolutionPage {


  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
