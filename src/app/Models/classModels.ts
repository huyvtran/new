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


export class Product{
    name:String;
    price:Number;
    discount:String;
    desc:String;
    category:String;
    image:File[];

}