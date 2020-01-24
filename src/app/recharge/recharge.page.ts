import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Register } from '../Models/classModels';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  id: number;
  userid: any;
  Wallet: number;
  arr: any;
  errmsg: any;
  data: Register = new Register();
  first: any;
  sec: any;
  total: any;
  btn: boolean = false;
  checks: boolean = false;
  err: boolean = false;
  name: any;
  valid: boolean = false;
  public modifyFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private myRoute: Router,
    public rest: RestService) {
    this.route.params.subscribe(params => this.doSearch(params));
    this.modifyFormGroup = this.fb.group({
      Wallet: ['', Validators.required],
      one: ['', Validators.required],
      two: ['', Validators.required],
    });
  }

  doSearch(param) {
    this.id = param.id;
  }

  ngOnInit() {
    this.checks = true;
    this.getuserDetails();
  }

  getuserDetails() {
    this.rest.getwallet(this.id).subscribe((result) => {
      if (result === undefined) {
        console.log(result);
        this.errmsg = true;
      }
      else {
        this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
        this.userid = this.arr[0].value;
        this.Wallet = this.userid.Wallet;
        this.name = this.userid.owner_name;
      }
    }, (err) => {
      console.log(err);
    });
  }

  check() {
    this.first = parseInt(this.modifyFormGroup.get('one').value);
    this.sec = parseInt(this.modifyFormGroup.get('two').value);
    if (this.modifyFormGroup.get('one').value == "") {
      alert('Please Enter Amount');
      this.valid = true;
      this.btn = false;
    }
    else {
      this.total = this.first + this.sec;
      console.log(this.total = this.first + this.sec);
      this.checks = false;
      this.btn = true;
    }
  }

  update(id) {
    Object.assign(this.data, this.modifyFormGroup.value);
    console.log(this.data);
    this.rest.updateWallet(id, this.data).subscribe((result) => {
      if (result === undefined) {
        console.log(result);
        this.errmsg = true;
      }
      else {
        this.getuserDetails();
        this.modifyFormGroup.reset();
        this.btn = false;
        this.checks = true;
      }

    }, (err) => {
      this.err = true;
      this.getuserDetails();
      console.log(err);
    });
  }
}
