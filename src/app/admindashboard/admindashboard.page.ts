import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.page.html',
  styleUrls: ['./admindashboard.page.scss'],
})
export class AdmindashboardPage implements OnInit {
user:any;
users;
product;
products;
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

// Doughnut
public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData:number[] = [200, 200, 100];
public doughnutChartType:string = 'doughnut';

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}


  constructor(private rest:RestService) { }

  ngOnInit() {
    this.totalUsers();
    this.totalProducts();
  }

totalUsers(){
  this.rest.getTotalUser().subscribe((result)=>{
    if(result==undefined){
      console.log(result);
    }
    else{
      this.user = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.users = this.user[0].value;
      console.log(this.users)
    }
  },
  (err) => {
    console.log(err);

  });
}




totalProducts(){
  this.rest.getTotalProducts().subscribe((result)=>{
    if(result==undefined){
      console.log(result);
    }
    else{
      this.product = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.products = this.product[0].value;
      console.log(this.products)
    }
  },
  (err) => {
    console.log(err);

  });
}


}
