import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {HomePage} from "../home/home";
/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  private arrayImgs;
  private ultima_img;
  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
      let imgs = this.navParams.get("imgs");
      if(imgs.length == 1){
          this.ultima_img =  imgs[0].src;
      }else{
         this.ultima_img =  imgs[imgs.length-1].src;
         imgs.pop();
          this.arrayImgs = imgs;
      }
  		
  }

finalizarTutorial(){
	this.viewCtrl.dismiss();
}

}
