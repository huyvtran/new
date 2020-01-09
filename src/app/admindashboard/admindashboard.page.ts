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
public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

public randomize():void {
  // Only Change 3 values
  let data = [
    Math.round(Math.random() * 100),
    59,
    80,
    (Math.random() * 100),
    56,
    (Math.random() * 100),
    40];
  let clone = JSON.parse(JSON.stringify(this.barChartData));
  clone[0].data = data;
  this.barChartData = clone;
  /**
   * (My guess), for Angular to recognize the change in the dataset
   * it has to change the dataset variable directly,
   * so one way around it, is to clone the data, change it and then
   * assign it;
   */
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
