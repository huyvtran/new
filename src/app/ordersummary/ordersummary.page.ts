import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.page.html',
  styleUrls: ['./ordersummary.page.scss'],
})
export class OrdersummaryPage implements OnInit {
  listData: MatTableDataSource<any>;
  arr;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.retrieval();
  }

  retrieval() {
    this.rest.getOrder().subscribe((result) => {
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
}
