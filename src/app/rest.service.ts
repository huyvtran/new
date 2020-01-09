import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {  Router } from '@angular/router';
import { Register, Login, Product } from '../app/Models/classModels';

//const endpoint = 'http://ec2-13-126-112-180.ap-south-1.compute.amazonaws.com:8080/';
const endpoint = 'http://localhost:8080/';
const agentid=1;

@Injectable({
  providedIn: 'root'
})
export class RestService {

  httpOptions:any;
  constructor(private http: HttpClient, private myRoute: Router) { }

  
  private extractData(res: Response) {
    let body = res;
    return body || { };
    
  }

  sendToken(token: string) {
    //alert(token);
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    //localStorage.removeItem("LoggedInUser");
  
    return localStorage.getItem("LoggedInUser");
  }
  isLoggednIn() {  
    return this.getToken() !== null;
  }
  sendRole(role){
    localStorage.setItem("LoggedInRole", role)
  }
  getRole(){
    return localStorage.getItem("LoggedInRole");
  }
  sendId(id){
    localStorage.setItem("LoggedInUserId", id)
  }
  getId(){
    return localStorage.getItem("LoggedInUserId");
  }

  logout() {
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("LoggedInUserId");
    localStorage.removeItem("LoggedInRole");
  }


 
  
   doRegister(data: Register): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'     
          })          
    };
      return this.http.post<Register>(endpoint + 'api/auth/signup' , data,this.httpOptions);
   }


    login(data: Login): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       // x-access-token: 'access_token'+this.getToken()
          })          
    };
      return this.http.post<Login>(endpoint + 'api/auth/signin' , data,this.httpOptions); 
   }

   
   addProduct(data: Product): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'x-access-token': this.getToken()
          })          
    };
      return this.http.post<Product>(endpoint + 'api/product/admin' , data,this.httpOptions); 
   }

 getuserdashboard(): Observable<any> {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  //const myheader=new HttpHeaders().set('AUTH_TOKEN', auth);
 // return this.http.get<any>(this.ADD_CART_API+product.productid,{headers:myheader});

  return this.http.get<any>(endpoint + 'api/userList', this.httpOptions);
}
 
getproduct(): Observable<any> {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  //const myheader=new HttpHeaders().set('AUTH_TOKEN', auth);
 // return this.http.get<any>(this.ADD_CART_API+product.productid,{headers:myheader});

  return this.http.get<any>(endpoint + 'api/productList', this.httpOptions);
}

getuserprofile(): Observable<any> {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/userdetails', this.httpOptions);
}


getTotalUser(): Observable<any> {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/userCount', this.httpOptions);
}

getTotalProducts(): Observable<any> {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/productCount', this.httpOptions);
}




}