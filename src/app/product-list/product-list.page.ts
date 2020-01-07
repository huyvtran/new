import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Login } from '../../app/Models/classModels'
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  listData: MatTableDataSource<any>;
  arr;

  displayedColumns: string[] = ['name','price','discount','desc', 'image'];



  public data: Login = new Login();

  constructor(public rest: RestService) { }

  ngOnInit() {

    this.retrieval();
  }
  retrieval() {
    this.rest.getproduct().subscribe((result) => {

      if (result === undefined) {
        console.log(result);


      }
      else {

        // this.listData = new MatTableDataSource(result);
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.listData = this.arr[0].value;
        console.log(this.listData);
        this.listData = new MatTableDataSource(this.arr[1].value);


      }

    }, (err) => {
      console.log(err);

    });

  }
}
