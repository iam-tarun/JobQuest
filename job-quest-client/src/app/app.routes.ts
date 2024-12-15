import { Routes } from '@angular/router';
import { HomeComponent } from './Screens/home/home.component';
import { SignInComponent } from './Screens/sign-in/sign-in.component';
import { SignUpComponent } from './Screens/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { ApplyComponent } from './Screens/apply/apply.component';
import { ApplicationsComponent } from './Screens/applications/applications.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'apply', component: ApplyComponent, canActivate: [AuthGuard]},
  {path: 'applications', component: ApplicationsComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
];
