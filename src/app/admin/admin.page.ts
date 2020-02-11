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
  listData;
  listDatas;
  arr;
  userid;
  photo
  isItemAvailable:boolean=false;
  isItemAvailables:boolean=false;
  displayedColumns: string[] = ['id', 'owner_name','Business_name', 'Email_address', 'owneraddress','Gst_no','phone_no',  'options','option','delete'];
  public data: Login = new Login();
  constructor(public rest: RestService) { }

  ngOnInit() {
    this.isItemAvailable=true;
   this.isItemAvailables=false;
    this.retrieval();
    this.getuserDetails();
  }


  getItems(ev: any) {
    this.listDatas=this.listData;
 console.log(this.listData);
  const val = ev.target.value.toLowerCase();
  if (val && val.trim() != ''){
    this.isItemAvailables = true;
    this.isItemAvailable = false;
  this.listDatas= this.listData.filter((item => {
      return (item.owner_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }
      )
    )

  }
  else{
    this.isItemAvailable=true;
    this.isItemAvailables=false;
  }
}


  getuserDetails() {
    this.rest.userprofile().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
       
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        // console.log(this.userid);
      
        this.photo = this.userid.photo;
      }
    }, (err) => {
      console.log(err);
    });
  }
  retrieval() {
    this.rest.getuserdashboard().subscribe((result) => {
      if (result === undefined) {
        console.log(result);
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.listData = this.arr[0].value;
        console.log(this.listData);
      //  this.listData = new MatTableDataSource(this.arr[1].value);
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

  
  doRefresh(event) {
     //console.log('Begin async operation');
this.retrieval();
    setTimeout(() => {
       //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  
  delete(id) {
    this.rest.deleteuser(id).subscribe((result) => {
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
}
