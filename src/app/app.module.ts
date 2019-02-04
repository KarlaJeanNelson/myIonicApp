import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { CompanyModalPage } from './company-modal/company-modal.page';
import { SignupPage } from './signup/signup.page'

@NgModule({
  declarations: [AppComponent, CompanyModalPage],
  entryComponents: [AppComponent, CompanyModalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
  	AngularFirestoreModule,
		AngularFireAuthModule,
		ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		AngularFireAuth
  ],
	bootstrap: [AppComponent]
})
export class AppModule {}
