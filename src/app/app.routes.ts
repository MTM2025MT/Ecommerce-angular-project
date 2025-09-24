import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Loging } from './Components/loging/loging';
import {SignUp} from '../app/Components/logingfolder/sign-up/sign-up';
import  {SignIn} from './Components/logingfolder/sign-in/sign-in';
import { Main } from './Components/main/main';
export const routes: Routes = [
 {
  path: '',
  pathMatch: 'full',
  component: Loging,
  children:[
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
  ],

 },
   {
  path: 'loging',
  pathMatch: 'full',
  component: Loging
 },
 {
    path: '',
    component:Main,
    children:[

 {
  path: 'home',
  component: Home
 }
 ,
  {
    path:'shoping-cart',
    loadComponent: () => import('./Components/shoping-cart/shoping-cart').then(c => c.ShopingCart)
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
  }
]
}
];
