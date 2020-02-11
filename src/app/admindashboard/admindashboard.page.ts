import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.page.html',
  styleUrls: ['./admindashboard.page.scss'],
})
export class AdmindashboardPage implements OnInit {
  user: any;
  users;
  product;
  products;
  order;
  arr;
  userid;
  photo;
  orders;
  amt; amts;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // Doughnut
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [200, 200, 100];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  getuserDetails() {
    this.rest.userprofile().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
       
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        // console.log(this.userid);
      
        this.photo = this.userid.photo;
      }
    }, (err) => {
      console.log(err);
    });
  }
  public chartHovered(e: any): void {
    // console.log(e);
  }


  constructor(private rest: RestService, private test: AppComponent, private myRoute: Router,private platform:Platform) { 
    this.platform.backButton.subscribe(async () => {
      if (this.myRoute.isActive('/admindashboard', true) && this.myRoute.url === '/admindashboard') {
        navigator['app'].exitApp();
      }
});
  }

  ngOnInit() {
    this.totalrevenue();
    this.totalOrders();
    this.totalUsers();
    this.totalProducts();
    this.getuserDetails();
  }

  doRefresh(event) {
     //console.log('Begin async operation');
    this.totalrevenue();
    this.totalOrders();
    this.totalUsers();
    this.totalProducts();
    setTimeout(() => {
       //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  totalUsers() {
    this.rest.getTotalUser().subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        this.user = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.users = this.user[0].value;
        // console.log(this.users)
      }
    },
      (err) => {
        console.log(err);
      });
  }

  totalOrders() {
    this.rest.getOrdercount().subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        this.order = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.orders = this.order[0].value;
      }
    },
      (err) => {
        console.log(err);

      });
  }

  totalrevenue() {

    this.rest.revenue().subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        // console.log(result)
        this.amt = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.amts = this.amt[0].value;
      }
    },
      (err) => {
        console.log(err);

      });
  }

  totalProducts() {
    this.rest.getTotalProducts().subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
        this.product = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.products = this.product[0].value;
      }
    },
      (err) => {
        console.log(err);
      });
  }
}
