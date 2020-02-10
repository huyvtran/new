import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PopoverController, NavController, IonSlides, ToastController, Platform } from '@ionic/angular';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Product, Category } from '../../app/Models/classModels'
import { AppComponent } from '../app.component';
import { TestoPage } from '../testo/testo.page';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

states:any;

  userid;
  arr;
  ar;
  role;
  listData;
  photo;
  showFile = false;
  fileUploads: Observable<string[]>;
  @Input() fileUpload: string;
  public modifyFormGroup: FormGroup;
  products: Product[] = [];
    categorys: Category[] = [];
  errmsg: boolean;
  admin: boolean;
  student: boolean;
  count: any;
  isItemAvailable:boolean=false;
  items;
  subscribe:any;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides
  constructor(private test: AppComponent,private platform:Platform, private route: Router, private rest: RestService, private toast: ToastController, public navCtrl: NavController, public popoverController: PopoverController) {
    this.platform.backButton.subscribe(async () => {
      if (this.route.isActive('/dashboard', true) && this.route.url === '/dashboard') {
        navigator['app'].exitApp();
      }
});
   }

   
  
  

    getItems(ev: any) {
      this.items=this.states;
   
    const val = ev.target.value.toLowerCase();
    if (val && val.trim() != ''){
      this.isItemAvailable=true;
    this.items= this.states.filter((item => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        )
      )

    }
    else{
      this.isItemAvailable = false;
    }
  }
  getProductName(){
    this.rest.productname().subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
    this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.states = this.arr[0].value;
   
       // console.log(this.states)
      }
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    setTimeout(() =>
      this.slides.slideTo(5, 10000), 1000);
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  getuserDetailss() {
    this.rest.userprofile().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
       // this.errmsg = true;
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        console.log(this.userid);
      
        this.photo = this.userid.photo;
       
    
    
 

      }
    }, (err) => {
      console.log(err);
    });
  }
  
  getuserDetails() {
    this.rest.userprofile().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
       
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        console.log(this.userid);
      
        this.photo = this.userid.photo;
      }
    }, (err) => {
      console.log(err);
    });
  }
  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TestoPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ngOnInit() {
    this.getuserDetailss();
    this.test.retrieval();
    this.retrievals();
    this.getcartdetails();
    this.getuserprofile();
    this.getuserDetails();
    this.retrieval();
    this.getProductName();
        console.log(this.constructor.name);
        this.showFiles(true);
  
  }


  doRefresh(event) {
     //console.log('Begin async operation');
    this.test.retrieval();
    this.retrievals();
    this.getcartdetails();
    this.getuserprofile();
    this.retrieval();
    this.showFiles(true);
    setTimeout(() => {
       //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  showFiles(enable: boolean): void {
    this.showFile = enable;
    if (enable) {
      this.fileUploads = this.rest.getFiles();
    }
  }

  getcartdetails() {
    this.rest.cartDetails().subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        this.count = this.arr[0].value;
      }
    }, (err) => {
      console.log(err);
    });
  }
  retrievals() {
    this.rest.getCategory().subscribe((Category) => {

      if (Category === undefined) {
     console.log(Category);

      }
      else {

        this.categorys = Category.category;
        //console.log(this.categorys);
      }
    }, (err) => {
       console.log(err);

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
        this.rest.sendId(this.userid.id);
        /* to get role of user */
        this.ar = Object.entries(this.userid.roles).map(([type, value]) => ({ type, value }));
        this.role = this.ar[0].value;
        this.rest.sendRole(this.role.name);
        /* Role Differntiation */
        if (this.rest.getRole() == "ADMIN") {
          this.test.getuserprofile();
          this.test.getuserDetails();
          this.route.navigate(['/admindashboard']);
        }
        else {
          this.test.getuserprofile();
          this.test.getuserDetails();
          this.route.navigate(['/dashboard']);
        }
      }
    }, (err) => {
      console.log(err);

    });
  }

  retrieval() {
    this.rest.getproduct().subscribe((Product) => {
      if (Product === undefined) {
        console.log(Product);
      }
      else {
        this.products = Product.product;
      }
    }, (err) => {
      console.log(err);
    });
  }
}
