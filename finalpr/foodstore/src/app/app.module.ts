
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { NgModule, Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { SliderComponent } from './components/slider/slider.component';
import { HighlightproductComponent } from './components/highlightproduct/highlightproduct.component';
import { TopproductComponent } from './components/topproduct/topproduct.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowproductsComponent } from './components/showproducts/showproducts.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin/admin.component';
import { InsertproductComponent } from './admin/components/insertproduct/insertproduct.component';
import { UpdateproductComponent } from './admin/components/updateproduct/updateproduct.component';
import { ListproductComponent } from './admin/components/listproduct/listproduct.component';
import { ListuserComponent } from './admin/components/listuser/listuser.component';
import { UpdateuserComponent } from './admin/components/updateuser/updateuser.component';
import { ListfeedbackComponent } from './admin/components/listfeedback/listfeedback.component';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    SliderComponent,
    HighlightproductComponent,
    TopproductComponent,
    HomepageComponent,
    FooterComponent,
    ShowproductsComponent,
    ProductdetailComponent,
    LoginComponent,
    RegisterComponent,
    UserprofileComponent,
    AdminComponent,
    InsertproductComponent,
    UpdateproductComponent,
    ListproductComponent,
    ListuserComponent,
    UpdateuserComponent,
    ListfeedbackComponent,
    NotfoundComponent
  ],
  imports: [
    
    BrowserModule,
    HttpModule,
    FormsModule, HttpClientModule
    ,
    RouterModule.forRoot([
{path:'',component:HomepageComponent},
{path:'product/:id',component:ProductdetailComponent},
{path:'products/:cate',component:ShowproductsComponent},
{path:'products',component:ShowproductsComponent},
{path:'product',component:ProductdetailComponent},
{path:'profile',component:UserprofileComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'admin',component:AdminComponent,children:[  //child routes for admin
  
  {path:'insertproduct',component:InsertproductComponent},
  {path:'updateproduct/:id',component:UpdateproductComponent},
  
  {path:'listproduct',component:ListproductComponent},
  {path:'listuser',component:ListuserComponent},
  {path:'updateuser/:id',component:UpdateuserComponent},
  {path:'listfeedback',component:ListfeedbackComponent},

]},
{path:'*',component:NotfoundComponent}
    ])
    
  ],
  providers: [ProductService,UserService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
