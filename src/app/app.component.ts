import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.component.scss'],

})
export class AppComponent {
	public breakpoints = {
		xs: 0,
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200
	}

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
			this.getWidth();
			this.getSize();
    });
	}

	getWidth() {
		return this.platform.width()
	}

	getSize() {
		const width = this.platform.width()
		return width < 576 ? 'xs'
		: width < 768 ? 'sm'
		: width < 992 ? 'md'
		: width < 1200 ? 'lg'
		: 'xl'
	}

	getCurrentUrl() {
		return this.router.url
	}

	goToAuth(path) {
		this.navCtrl.navigateForward(path)
	}
}
