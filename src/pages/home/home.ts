import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  solution: number[];
  guess: number[] = [];
  tries: { guess: number[], numCorrectPlace: number, numCorrectVal: number }[] = [];

  constructor(public navCtrl: NavController) {
    this.getSolution();
  }

  add(n: number) {
    this.guess.push(n);
    if (this.guess.length === 4) {
      this.checkSolution();
    }
  }
  remove() {
    if (this.guess.length !== 0) {
      this.guess.splice(this.guess.length - 1, 1);
    }
  }

  getSolution() {
    this.solution = [6, 3, 7, 0];
  }

  checkSolution() {
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
      console.log(`${tempGuess} - ${tempSolution}`)
    }

    for (i = tempGuess.length - 1; i >= 0; i--) {
      console.log(tempSolution.indexOf(tempGuess[i]));
      if (tempSolution.indexOf(tempGuess[i]) !== -1) {
        numCorrectVal++;
        tempSolution.splice(tempSolution.indexOf(tempGuess[i]), 1);
        tempGuess.splice(i, 1);
      }
      console.log(`${tempGuess} - ${tempSolution}`)
    }

    this.tries.unshift({
      guess: this.guess,
      numCorrectPlace: numCorrectPlace,
      numCorrectVal: numCorrectVal
    });
    this.guess = [];
    return (numCorrectPlace === 4)

  }

}
