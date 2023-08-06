import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { HeaderComponent } from './header/header.component';
import { CartService } from './cart.service';
import { Page404Component } from './page404/page404.component';
import { CommentsComponent } from './product-page/comments/comments.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeComponent } from './theme/theme.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    AdminComponent,
    CartComponent,
    ProductPageComponent,
    HeaderComponent,
    Page404Component,
    CommentsComponent,
    FooterComponent,
    ThemeComponent,
    PhoneNumberComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
