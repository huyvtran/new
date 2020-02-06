import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.page.html',
  styleUrls: ['./property-list.page.scss'],
})

export class PropertyListPage implements OnInit {
  listData: MatTableDataSource<any>;
  arr;
  userid;
photo;
  displayedColumns: string[] = ['propertyname', 'propertyprice', 'propertyimage', 'userId', 'options'];

  constructor(public rest: RestService) { }

  ngOnInit() {
    this.retrieval();
    this.getuserDetails();
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
  retrieval() {
    this.rest.getproperty().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.listData = this.arr[0].value;
        this.listData = new MatTableDataSource(this.arr[1].value);
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
