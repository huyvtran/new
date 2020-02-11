import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.page.html',
  styleUrls: ['./whishlist.page.scss'],
})
export class WhishlistPage implements OnInit {
  listData: MatTableDataSource<any>;
  arr;
  userid;
  photo;
  wish;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.retrieval();
    this.getuserDetails();
  }

  retrieval() {
    this.rest.getwish().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
      }
      else {
    this.wish=result.order;
      }
    }, (err) => {
      console.log(err);
    });
  }


  delete(id) {
    this.rest.deletewish(id).subscribe((result) => {
      if (result == undefined) {
        console.log(result);
      }
      else {
      this.getuserDetails();
      this.retrieval();
        //console.log(result);
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
  doRefresh(event) {
     //console.log('Begin async operation');
 this.retrieval();
    setTimeout(() => {
       //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
