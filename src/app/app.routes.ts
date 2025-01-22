import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
    {
        path:'', component:HomepageComponent
    },
    {
        path:'login', component:LoginComponent,
    },
    {
        path:'update', component:UpdateComponent
    }
];
