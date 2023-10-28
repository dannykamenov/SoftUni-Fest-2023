import { NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { MyProfileComponent } from './auth/my-profile/my-profile.component';
import { AuthGuard2 } from './shared/guard/verified.guard'
import { ReviewPageComponent } from './elteck/review-page/review-page.component';
import { PostReviewComponent } from './elteck/post-review/post-review.component';
import { Title } from '@angular/platform-browser';
import { NotFoundComponent } from './elteck/not-found/not-found.component';
import { EditReviewComponent } from './elteck/edit-review/edit-review.component';
import { SearchComponent } from './elteck/search/search.component';
import { MerchantPageComponent } from './elteck/merchant-page/merchant-page.component';
import { ProductPageComponent } from './elteck/product-page/product-page.component';
import { AuthGuard3 } from './shared/guard/roleguard.guard';
import { AuthGuard4 } from './shared/guard/roleguard2.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent, data: {title: 'Home'}},
  {path: 'my-profile', component: MyProfileComponent, data: {title: 'My Profile'}, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}, canActivate: [AuthGuard2]},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}, canActivate: [AuthGuard2]},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: {title: 'Forgot Password'}, canActivate: [AuthGuard2]},
  {path: 'verify-email', component: VerifyEmailComponent, data: {title: 'Verify Email'}, canActivate: [AuthGuard2]},
  {path: 'products', component: ReviewPageComponent, data: {title: 'My Products'}, canActivate: [AuthGuard3]},
  {path: 'create-product', component: PostReviewComponent, data: {title: 'Create Product'}, canActivate: [AuthGuard3]},
  {path: 'not-found', component: NotFoundComponent, data: {title: 'Not Found'}},
  {path: 'edit-product/:id', component: EditReviewComponent, data: {title: 'Edit Product'}, canActivate: [AuthGuard3]},
  {path: 'search', component: SearchComponent, data: {title: 'Search'}, canActivate: [AuthGuard4]},
  {path: 'merchant/:id', component: MerchantPageComponent, data: {title: 'Merchant'}, canActivate: [AuthGuard4]},
  {path: 'product-info/:id', component: ProductPageComponent, data: {title: 'Product'}, canActivate: [AuthGuard4]},
  {path: '**', redirectTo: 'not-found', data: {title: 'Not Found'}},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the current activated route
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }

        // Get the 'title' data property from the route's data
        const title = route.snapshot.data['title'];

        // Update the browser tab title
        this.titleService.setTitle(title);
      }
    });
  }
 }
