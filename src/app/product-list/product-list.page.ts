import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})

export class ProductListPage implements OnInit {
  listData: MatTableDataSource<any>;
  arr;
  displayedColumns: string[] = ['name', 'price', 'discount', 'desc', 'category', 'userId', 'permission', 'edit'];

  constructor(public rest: RestService) { }

  ngOnInit() {
  
    this.retrieval();
  }

  retrieval() {
    this.rest.getdashboardproduct().subscribe((result) => {
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

  load(){
    window.location.reload();
  }
  
  approve(number, id) {
    this.rest.updateproductStatus(number, id).subscribe((result) => {
      if (result === undefined) {
        console.log(result);
      }
      else {
        this.retrieval();
      }
    }, (err) => {
      console.log(err);
    });
  }
}
