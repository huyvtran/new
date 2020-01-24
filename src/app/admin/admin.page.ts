import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Login } from '../../app/Models/classModels'
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})

export class AdminPage implements OnInit {
  listData: MatTableDataSource<any>;
  arr;
  displayedColumns: string[] = ['Email_address', 'phone_no', 'options'];
  public data: Login = new Login();
  constructor(public rest: RestService) { }

  ngOnInit() {
    this.retrieval();
  }

  retrieval() {
    this.rest.getuserdashboard().subscribe((result) => {
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

  approve(number, id) {
    this.rest.updateuser(number, id).subscribe((result) => {
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
