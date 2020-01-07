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
