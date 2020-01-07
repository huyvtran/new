import { Component, OnInit } from '@angular/core';
import {  PopoverController } from '@ionic/angular';
import { MobileAccesoriesComponent } from '../mobile-accesories/mobile-accesories.component';


@Component({
  selector: 'app-testo',
  templateUrl: './testo.component.html',
  styleUrls: ['./testo.component.scss'],
})
export class TestoComponent implements OnInit {

  constructor( private popoverController :PopoverController) { }

  ngOnInit() {}
  
  async presentPopover(ev: any) {
  
    const popover = await this.popoverController.create({
      component: MobileAccesoriesComponent,
      event: ev,
      translucent: true
      });
  return await popover.present();
   }
  
}



  