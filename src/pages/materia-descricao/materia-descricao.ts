import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MateriaDescricaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materia-descricao',
  templateUrl: 'materia-descricao.html',
})
export class MateriaDescricaoPage {
  private descricao;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.descricao = this.navParams.get("descricao");
  	console.log(this.descricao);
  }

 

}
