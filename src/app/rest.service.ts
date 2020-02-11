import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest,HttpEvent } from '@angular/common/http';
import { Observable} from 'rxjs';
import {  Router } from '@angular/router';
import { Register,Property, Login, Product, Reseller, Wallet, AddtoCart, Forgot } from '../app/Models/classModels';

// const endpoint = 'http://ec2-18-188-252-77.us-east-2.compute.amazonaws.com:8080/';
  const endpoint = 'http://localhost:8080/'
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
    localStorage.removeItem("productId");
    localStorage.removeItem("name");
    localStorage.removeItem("price");
    localStorage.removeItem("image");
  
  }


 
  
   doRegister(data: Register): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'     
          })          
    };
      return this.http.post<Register>(endpoint + 'api/auth/signup' , data,this.httpOptions);
   }


   addtocart(data:AddtoCart): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'   ,
        'x-access-token': this.getToken()  
          })          
    };
      return this.http.post<AddtoCart>(endpoint + 'api/addtocart' , data,this.httpOptions);
   }

   order(data:AddtoCart): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'   ,
        'x-access-token': this.getToken()  
          })          
    };
      return this.http.post<AddtoCart>(endpoint + 'api/order' , data,this.httpOptions);
   }
 
   wish(data:AddtoCart): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'   ,
        'x-access-token': this.getToken()  
          })          
    };
      return this.http.post<any>(endpoint + 'api/wish' , data,this.httpOptions);
   }
   AddtoOrder(data:AddtoCart ): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': this.getToken()
          }) 
    };
    
    
    return this.http.post<AddtoCart>(endpoint + 'api/AddtoOrder',data ,this.httpOptions);
   }
 
   
   Register(data: Reseller): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'     
          })          
    };
      return this.http.post<Reseller>(endpoint + 'api/auth/signup' , data,this.httpOptions);
   }

   UpdateRegister(data: Reseller): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json' ,
          'x-access-token': this.getToken()    
          })          
    };
      return this.http.put<Reseller>(endpoint + 'api/file/profileupdate' , data,this.httpOptions);
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


   
forgot(data:Forgot): Observable<any>{
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     
        })
  };
  return this.http.put<any>(endpoint + 'api/updatepass/',data, this.httpOptions);
}

   addProperty(data: Property): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'x-access-token': this.getToken()
          })          
    };
      return this.http.post<Product>(endpoint + 'api/property/admin' , data,this.httpOptions); 
   }

   name(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'x-access-token': this.getToken()
          })          
    };
      return this.http.get<any>(endpoint + 'api/getprname' , this.httpOptions); 
   }
   

   getOrder(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'x-access-token': this.getToken()
          })          
    };
      return this.http.get<any>(endpoint + 'api/getorder' , this.httpOptions); 
   }

   revenue(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'x-access-token': this.getToken()
          })          
    };
      return this.http.get<any>(endpoint + 'api/revenue' , this.httpOptions); 
   }
   
   getOrdercount(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'x-access-token': this.getToken()
          })          
    };
      return this.http.get<any>(endpoint + 'api/orderCount' , this.httpOptions); 
   }


   getAllOrder(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'x-access-token': this.getToken()
          })          
    };
      return this.http.get<any>(endpoint + 'api/AdminorderList' , this.httpOptions); 
   }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://ec2-18-188-252-77.us-east-2.compute.amazonaws.com:8080/api/file/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


  getFiles(): Observable<any> {
    return this.http.get('http://ec2-18-188-252-77.us-east-2.compute.amazonaws.com:8080/api/file/all');
  }
  
  pushFileToStorages(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
  
    const req = new HttpRequest('POST', 'http://ec2-18-188-252-77.us-east-2.compute.amazonaws.com:8080/api/file/product', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

profile(file: File): Observable<HttpEvent<{}>> {
  const formdata: FormData = new FormData();

  formdata.append('file', file);

  const req = new HttpRequest('POST', 'http://ec2-18-188-252-77.us-east-2.compute.amazonaws.com:8080/api/file/profile', formdata, {
    reportProgress: true,
    responseType: 'text'
  });

  return this.http.request(req);
}

  property(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
  
    const req = new HttpRequest('POST', 'http://ec2-18-188-252-77.us-east-2.compute.amazonaws.com:8080/api/file/property', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  userprofile(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': this.getToken()
          })
    };
 
    return this.http.get<any>(endpoint + 'api/userview', this.httpOptions);
  }
  getCartList(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'x-access-token': this.getToken()
          })
    };
    //const myheader=new HttpHeaders().set('AUTH_TOKEN', auth);
   // return this.http.get<any>(this.ADD_CART_API+product.productid,{headers:myheader});
  
    return this.http.get<any>(endpoint + 'api/getcart', this.httpOptions);
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

  return this.http.get<any>(endpoint + 'api/dashproductList', this.httpOptions);
}

getwish(): Observable<any>{
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
     'x-access-token': this.getToken()
        })          
  };
    return this.http.get<any>(endpoint + 'api/getwish' , this.httpOptions); 
 }

getCategory(): Observable<any> {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  //const myheader=new HttpHeaders().set('AUTH_TOKEN', auth);
 // return this.http.get<any>(this.ADD_CART_API+product.productid,{headers:myheader});

  return this.http.get<any>(endpoint + 'api/category', this.httpOptions);
}
getdashboardproduct(){
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
getproperty(): Observable<any> {
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  //const myheader=new HttpHeaders().set('AUTH_TOKEN', auth);
 // return this.http.get<any>(this.ADD_CART_API+product.productid,{headers:myheader});

  return this.http.get<any>(endpoint + 'api/propertyList', this.httpOptions);
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

updateuser(num,id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/updateuser/'+id+"/"+num, this.httpOptions);
}


delete(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.delete<AddtoCart>(endpoint + 'api/destroyOne/'+id, this.httpOptions);
}


deletewish(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.delete<any>(endpoint + 'api/destroywish/'+id, this.httpOptions);
}

deleteuser(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.delete<Register>(endpoint + 'api/destroyUser/'+id, this.httpOptions);
}



deleteProperty(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.delete<Property>(endpoint + 'api/destroyProperty/'+id, this.httpOptions);
}

deleteProduct(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.delete<Product>(endpoint + 'api/destroyProduct/'+id, this.httpOptions);
}


updateproductStatus(num,id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/updateProduct/'+id+"/"+num, this.httpOptions);
}

updateWallet(id,data:Register){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };

  return this.http.put<any>(endpoint + 'api/updatwallet/'+id,data, this.httpOptions);
}



update(id,data:Product){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };

  return this.http.put<any>(endpoint + 'api/updatesProduct/'+id,data, this.httpOptions);
}

getService(service){
this.httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'x-access-token': this.getToken()
      })
};

return this.http.get<any>(endpoint + 'api/service/'+service, this.httpOptions);
}


cartDetails(){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'  ,
      'x-access-token': this.getToken() 
        })          
  };
    return this.http.get<any>(endpoint + 'api/cartCount', this.httpOptions);
 
 }

 productname(): Observable<any>{
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'  ,
      'x-access-token': this.getToken() 
        })          
  };
    return this.http.get<any>(endpoint + 'api/productName', this.httpOptions);
 
 }
 total(){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'  ,
      'x-access-token': this.getToken() 
        })          
  };
    return this.http.get<any>(endpoint + 'api/total', this.httpOptions);
 
 }



getwallet(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/get/'+id, this.httpOptions);
}
geteditprod(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/editprod/'+id, this.httpOptions);
}



getProduct(id){
  this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'x-access-token': this.getToken()
        })
  };
  return this.http.get<any>(endpoint + 'api/productdetails/'+id, this.httpOptions);
}


}