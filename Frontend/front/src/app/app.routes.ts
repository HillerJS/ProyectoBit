import { Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';



export const routes: Routes = [
    {path:'blog',title:'Blog',component:BlogComponent},
    {path:'contact',title:'Contact',component:ContactComponent},
    {path:'home',title:'Home',component:HomeComponent},
    {path:'login',title:'Login',component:LoginComponent},
    {path:'register',title:'Register',component:RegisterComponent},
    {path:'shop',title:'Shop',component:ShopComponent},
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'**', title:'404 Page not found', component:NotFoundComponent}
];
