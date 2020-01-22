import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
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
  listData: any;
  products: Product[] = [];
  service: any;

  constructor(private rest: RestService, private popoverController: PopoverController, private route: ActivatedRoute) { this.route.params.subscribe(params => this.doSearch(params)); }


  ngOnInit() {

    this.retrieval();
  }


  doSearch(param) {
    this.service = param.service;
    // console.log(this.id);
  }



  retrieval() {
    this.rest.getService(this.service).subscribe((Product) => {

      if (Product === undefined) {
        //  console.log(Product);


      }
      else {
        this.listData = Object.entries(Product).map(([type, value]) => ({ type, value }));
        this.products = this.listData[0].value;

        console.log(this.products);



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



