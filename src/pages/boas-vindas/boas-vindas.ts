import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
/**
 * Generated class for the BoasVindasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boas-vindas',
  templateUrl: 'boas-vindas.html',
})
export class BoasVindasPage {

  constructor(private viewCtrl:NavController) {
  	let ref = this;
  		setTimeout(()=>{
  			ref.viewCtrl.setRoot(HomePage)
  		},3000)
  }

}
