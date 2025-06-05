import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Register} from './components/register/register';
import {Main} from './components/main/main';

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: '', component: Main},]
