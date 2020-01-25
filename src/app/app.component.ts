import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverController, NavController, IonSlides, ToastController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { Register, Category } from './Models/classModels';
import { RestService } from './rest.service';
import { Router } from '@angular/router';
import { TestoPage } from './testo/testo.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  userid;
  arr;
  ar;
  role;
  name;
  cat;
  owner_name;
  business_name;
  Email_address;
  phone_no;
  owneraddress;
  web_address;
  categorys: Category[] = [];

  category;
  public data: Register = new Register();
  errmsg: boolean;
  admin: boolean = false;
  user: boolean = false;

  constructor(private rest: RestService, private route: Router,
    private platform: Platform, private mm: ModalController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, private toast: ToastController, public popoverController: PopoverController
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  topClick() {
    this.route.navigate(['/login']);
  }
  ngOnInit() {
    //this.proname();
    this.retrieval();
    this.getuserDetails();
    this.getuserprofile();

  }

  navigate() {
    this.route.navigate(['/add-product']);
  }

  async presentModal() {
    const modal = await this.mm.create({
      component: TestoPage
    });
    return await modal.present();
  }

  getuserDetails() {
    this.rest.userprofile().subscribe((result) => {

      if (result === undefined) {
        console.log(result);
        this.errmsg = true;
      }
      else {

        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        //console.log(this.userid);
        this.owner_name = this.userid.owner_name;
        this.business_name = this.userid.business_name;
        this.Email_address = this.userid.Email_address;
        this.phone_no = this.userid.phone_no;
        this.owneraddress = this.userid.owneraddress;
        this.web_address = this.userid.web_address;


        /* to get role of user */



      }

    }, (err) => {
      //console.log(err);

    });
  }



  getuserprofile() {
    this.rest.getuserprofile().subscribe((result) => {

      if (result === undefined) {
        console.log(result);
        this.errmsg = true;
      }
      else {
        /* to get userdetails */
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[1].value;
        this.name = this.userid.owner_name;
        this.rest.sendId(this.userid.id);


        /* to get role of user */

        this.ar = Object.entries(this.userid.roles).map(([type, value]) => ({ type, value }));
        this.role = this.ar[0].value;
        //console.log(this.role.name);
        this.rest.sendRole(this.role.name);
      //  localStorage.setItem("ii",this.role.name);

      /* Role Differntiation */
        if (this.rest.getRole() == "ADMIN") {
          this.admin = true;
        }

        else {

          this.user = true;


        }
      }

    }, (err) => {
      console.log(err);

    });
  }

  retrieval() {
    this.rest.getCategory().subscribe((Category) => {

      if (Category === undefined) {
     console.log(Category);

      }
      else {

        this.categorys = Category.category;
        console.log(this.categorys);
      }
    }, (err) => {
       console.log(err);

    });

  }

  logOut() {
  
    this.rest.logout();
    this.route.navigate(['/login']);
    this.admin = false;
    this.user = false;
  }

}

