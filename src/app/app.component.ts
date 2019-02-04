import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SignupPage } from './signup/signup.page'
// import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
		},
		{
			title: 'Companies',
			url: '/companies',
			icon: 'business'
		},
		{
			title: 'Contacts',
			url: '/contacts',
			icon: 'contacts'
		},
		{
			title: 'Jobs',
			url: '/jobs',
			icon: 'cog'
		},
		{
			title: 'Tasks',
			url: '/tasks',
			icon: 'checkbox'
		}
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private router: Router,
		private navCtrl: NavController,
		// private auth: AuthService
  ) {
		this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
	}

	getCurrentUrl() {
		return this.router.url
	}

	signup() {
		this.navCtrl.navigateForward('/signup')
	}
}
