import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.page.html',
  styleUrls: ['./adminorders.page.scss'],
})
export class AdminordersPage implements OnInit {
  listData: MatTableDataSource<any>;
  arr;
  displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];
  constructor(private rest: RestService) { }

  ngOnInit() {
    this.retrieval();
  }

  retrieval() {
    this.rest.getAllOrder().subscribe((result) => {
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
    console.log('Begin async operation');
  this.retrieval();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
