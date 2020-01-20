import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'userlist',
    loadChildren: () => import('./userlist/userlist.module').then(m => m.UserlistPageModule)
  },

  {
    path: 'all-category',
    loadChildren: () => import('./all-category/all-category.module').then(m => m.AllCategoryPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfilePageModule)
  },

  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then(m => m.AddProductPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart-modal/cart-modal.module').then(m => m.CartModalPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListPageModule)
  },
  {
    path: 'admindashboard',
    loadChildren: () => import('./admindashboard/admindashboard.module').then(m => m.AdmindashboardPageModule)
  },
  {
    path: 'reseller',
    loadChildren: () => import('./reseller/reseller.module').then(m => m.ResellerPageModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./chart/chart.module').then(m => m.ChartPageModule)
  },
  {
    path: 'chart2',
    loadChildren: () => import('./chart2/chart2.module').then(m => m.Chart2PageModule)
  },
  {
    path: 'recharge/:id',
    loadChildren: () => import('./recharge/recharge.module').then(m => m.RechargePageModule)
  },
  {
    path: 'property-list',
    loadChildren: () => import('./property-list/property-list.module').then(m => m.PropertyListPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'democart',
    loadChildren: () => import('./democart/democart.module').then(m => m.DemocartPageModule)
  },
  {
    path: 'democart2',
    loadChildren: () => import('./democart2/democart2.module').then(m => m.Democart2PageModule)
  },

  {
    path: 'testo',
    loadChildren: () => import('./testo/testo.module').then(m => m.TestoPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
