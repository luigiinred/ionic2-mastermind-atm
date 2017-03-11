import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { SolutionPage } from '../solution/solution';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  solution: number[];
  guess: number[] = [];
  tries: { guess: number[], numCorrectPlace: number, numCorrectVal: number, dots: string[] }[] = [];
  filler = [];
  maxTries = 15;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.getSolution();
    console.log(this.solution)
    this.filler.length = this.maxTries;
  }
  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
  add(n: number) {
    if (this.guess.length !== 4) {
      this.guess.push(n);

    }
  }

  remove() {
    let alert = this.alertCtrl.create({
      title: "Do you want to start over?",

      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.reset();
          }
        }
      ]
    });
    alert.present();
  }
  clear() {
    this.guess = [];
  }

  getSolution() {
    this.solution = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.shuffle(this.solution)
    this.solution.length = 4;

  }

  checkSolution() {
    if (this.guess.length === 4) {
      let tempSolution = this.solution.concat([]);
      let tempGuess = this.guess.concat([]);
      let numCorrectPlace = 0;
      let numCorrectVal = 0;
      let i: number;

      console.log(`${tempGuess} - ${tempSolution}`)
      // Get Correct Place
      for (i = tempGuess.length - 1; i >= 0; i--) {
        if (tempSolution[i] == tempGuess[i]) {
          numCorrectPlace++;
          tempGuess.splice(i, 1);
          tempSolution.splice(i, 1);
        }

      }

      for (i = tempGuess.length - 1; i >= 0; i--) {

        if (tempSolution.indexOf(tempGuess[i]) !== -1) {
          numCorrectVal++;
          tempSolution.splice(tempSolution.indexOf(tempGuess[i]), 1);
          tempGuess.splice(i, 1);
        }

      }
      let dots = [];
      for (let x = 0; x < numCorrectPlace; x++) {
        dots.push('place')
      }
      for (let x = 0; x < numCorrectVal; x++) {
        dots.push('val')
      }
      dots.push('')
      dots.push('')
      dots.push('')
      dots.push('')
      dots.length = 4;


      this.tries.unshift({
        guess: this.guess,
        numCorrectPlace: numCorrectPlace,
        numCorrectVal: numCorrectVal,
        dots: dots
      });
      this.filler.length = this.maxTries - this.tries.length;

      this.guess = [];
      if (numCorrectPlace === 4) {
        this.showHint();
        this.reset()
      }
      if (this.tries.length == 15) {
        let alert = this.alertCtrl.create({
          title: 'Too many tries. Your pin has changed.',

          buttons: ['Dismiss']
        });
        alert.present();
        this.reset();
      }
      return (numCorrectPlace === 4)
    }
  }

  showHint() {

    let modal = this.modalCtrl.create(SolutionPage, null, { enableBackdropDismiss: false });
    modal.onDidDismiss(() => {

    })
    modal.present().then(() => { }, () => { console.log('wtf') });
  }

  reset() {
    this.solution = [];
    this.guess = [];
    this.tries = [];
    this.filler.length = this.maxTries;
    this.getSolution();
    console.log(this.solution);
  }
}
