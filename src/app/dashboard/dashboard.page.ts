import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PopoverController, NavController, IonSlides, ToastController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Product, Category } from '../../app/Models/classModels'
import { AppComponent } from '../app.component';

import { TestoPage } from '../testo/testo.page';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  model: any;

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();



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

  @ViewChild(IonSlides, { static: false }) slides: IonSlides
  constructor(private test: AppComponent, private route: Router, private rest: RestService, private toast: ToastController, public navCtrl: NavController, public popoverController: PopoverController) { }

  SlideChanged() {
  }
  ionViewDidLoad() {
    setTimeout(() =>
      this.slides.slideTo(5, 10000), 1000);
  }
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
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
    this.test.retrieval();
    this.retrievals();
    this.getcartdetails();
    this.getuserprofile();
    this.getuserDetails();
    this.retrieval();
    this.showFiles(true);
  }



  
  doRefresh(event) {
    console.log('Begin async operation');
    this.test.retrieval();
    this.retrievals();
    this.getcartdetails();
    this.getuserprofile();
    this.retrieval();
    this.showFiles(true);
    setTimeout(() => {
      console.log('Async operation has ended');
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
        console.log(this.categorys);
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
