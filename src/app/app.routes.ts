import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Loging } from './Components/loging/loging';
import {SignUp} from '../app/Components/logingfolder/sign-up/sign-up';
import  {SignIn} from './Components/logingfolder/sign-in/sign-in';
import { Main } from './Components/main/main';
import { authGuardGuard } from './guard/auth-guard-guard';
import { Order } from './Components/order/order';
export const routes: Routes = [
 {
  path: 'loging',
  component: Loging,
  children:[
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
  ],

 },
 {
  path:'',
  pathMatch:'full',
  redirectTo:'loging'
 },
 {
    path: 'main',
    component:Main,
    canActivate:[authGuardGuard],
    children:[
 {
  path: 'home',
  component: Home
 },
   { path: '', redirectTo: 'home', pathMatch: 'full' }
 ,
  {
    path:'shoping-cart',
    loadComponent: () => import('./Components/shoping-cart/shoping-cart').then(c => c.ShopingCart),
    children:[
      {
        path:'order',
        component:Order
      }
    ]
  }
  ,
  {
    path:'profile',
    loadComponent: () => import('./Components/profile/profile').then(c => c.Profile)
  }
  ,
  {
    path:'single-product/:id',
    loadComponent: () => import('./Components/single-product/single-product').then(c => c.SingleProduct)
  },
  {
    path:'About',
    loadComponent: () => import('./Components/about/about').then(c => c.About)
  },
  {
    path:'Favourite',
    loadComponent: () => import('./Components/favourit-page/favourit-page').then(c => c.FavouritPage)
  },
  {
    path:'products',
    loadComponent: () => import('./Components/products/products').then(c => c.Products)
  },
  {    path:'products/:category',
    loadComponent: () => import('./Components/products/products').then(c => c.Products)
  }

]
}
];
