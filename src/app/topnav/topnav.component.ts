import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {
	@Input() devWidth: number;
	@Input() devSize: string;

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
		private router: Router,
		private navCtrlr: NavController,
  ) {	}

	getCurrentUrl() {
		return this.router.url
	}

	goToAuth(path) {
		this.navCtrlr.navigateForward(path)
	}
}
