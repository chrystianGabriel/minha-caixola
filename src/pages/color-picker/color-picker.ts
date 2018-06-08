import { Component } from '@angular/core';
import { IonicPage,ViewController } from 'ionic-angular';

/**
 * Generated class for the ColorPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-color-picker',
  templateUrl: 'color-picker.html',
})
export class ColorPickerPage {

  constructor(public viewCtrl:ViewController) {
  }

  getCor(cor){
  	this.viewCtrl.dismiss(cor)
  }
 

}
