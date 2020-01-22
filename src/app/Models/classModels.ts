export class Register{
    name:string;
    password:string;
    email:string;
    cpass:string;
    roles:String[];
}
export class Login{
    email:string;
    password:string;
}
export class Roles{
    roles:string;
}

export class Wallet{
    Wallet:Number;
}

export class Product{
    name:String;
    sub:String;
    price:Number;
    discount:String;
    desc:String;
    category:String;
    image:File[];

}

export class Category{
name:String;
}

export class AddtoCart{
    name:String;
    price:Number;
    quantity:Number;
    userId:Number;
    total:Number;
    productId:Number;
    image:File[];
}



export class Property{
    propertyname:String;
    category:String;
    propertydesc: String;
    propertyprice: String;
    propertyimage: String;
}


export class Reseller{
    Business_name:String;
    owner_name:String;
    owneraddress:String;
    Email_address:String;
    Web_address:String;
  password:string;
  cpass:string;
    phone_no:Number;
    Registration_certificate:String;
    GST_Certificate:String;
    Pan_card:String;
    Product_category:String;
    complete_address:String;
}

export class Forgot{
    email:String;
    phone_no:String;
    password:String;
    cpass:String;
    }