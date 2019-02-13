import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { TopnavComponent } from './topnav/topnav.component'

@NgModule({
  declarations: [AppComponent, CompanyModalPage, TopnavComponent],
  entryComponents: [AppComponent, CompanyModalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
  	AngularFirestoreModule,
		AngularFireAuthModule,
		ReactiveFormsModule,
		FormsModule
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
