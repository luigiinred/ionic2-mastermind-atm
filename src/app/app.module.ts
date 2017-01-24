import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SolutionPage } from '../pages/solution/solution';


@NgModule({
  declarations: [
    MyApp,

    HomePage,
SolutionPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    HomePage,
SolutionPage
  ],
  providers: []
})
export class AppModule { }
