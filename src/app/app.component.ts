import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PopoverController,NavController,IonSlides, ToastController } from '@ionic/angular';
import { TestoComponent } from './testo/testo.component';
import{ModalController} from '@ionic/angular';
import { Register } from './Models/classModels';
import { RestService } from './rest.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  userid;
  arr;
  ar;
  role;

  public data : Register = new Register();
  errmsg: boolean;
  admin:boolean;
  user:boolean;
  

  constructor(private rest:RestService,
    private platform: Platform,private mm:ModalController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private toast:ToastController,public popoverController: PopoverController
  ) {
    this.initializeApp();
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: TestoComponent,
     // event: ev,
      translucent: true
    });
    return await popover.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

   ngOnInit(){
    this.getuserprofile();
   }
  getuserprofile(){
    this.rest.getuserprofile().subscribe((result) => {
    
    if(result === undefined)
    {
    console.log(result);
    this.errmsg=true;
    }
    else
    {
     /* to get userdetails */
      this.arr = Object.entries(result).map(([type, value]) => ({ type, value }));
      this.userid = this.arr[1].value;
      this.rest.sendId(this.userid.id);
    

      /* to get role of user */

      this.ar = Object.entries(this.userid.roles).map(([type, value]) => ({ type, value }));
    this.role= this.ar[0].value;
    console.log(this.role.name);
    this.rest.sendRole(this.role.name);
 
    
    /* Role Differntiation */
    if(this.rest.getRole()== "ADMIN"){

this.admin=true;
    }
    
    else {
    this.user=true;
  
    
    }
    }
    
    }, (err) => {
    console.log(err);
    
    });
    }
}

