import { Component, OnInit } from '@angular/core';
import {  PopoverController } from '@ionic/angular';
import { MobileAccesoriesComponent } from '../mobile-accesories/mobile-accesories.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { Product } from '../Models/classModels';


@Component({
  selector: 'app-testo',
  templateUrl: './testo.page.html',
  styleUrls: ['./testo.page.scss'],
})
export class TestoPage implements OnInit {
  productname: string;
  arr;
  listData:any;
  products: Product[] = [];

  constructor( private rest:RestService, private popoverController :PopoverController,private route: ActivatedRoute) 
  {
   }

 
   ngOnInit() {

    this.retrieval();
  }


    
  retrieval() {
    this.rest.getproduct().subscribe((Product) => {

      if (Product === undefined) {
      //  console.log(Product);


      }
      else {

     this.products=Product.product;
     
  

      }

    }, (err) => {
      console.log(err);

    });

  }

  
  async presentPopover(ev: any) {
  
    const popover = await this.popoverController.create({
      component: MobileAccesoriesComponent,
      event: ev,
      translucent: true
      });
  return await popover.present();
   }
  

  
 
}



  