import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.page.html',
	styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
	error: string;
	authForm: FormGroup;
	header: string;
	icon: string;

	constructor(
		fb: FormBuilder,
		private auth: AuthService,
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private router: Router,

	) {
		this.authForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			password2: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
		this.header = this.route.snapshot.data['header'];
		this.icon = this.route.snapshot.data['icon'];
	}

	onSubmit() {
		let data = this.authForm.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.router.url === '/signup' ? this.checkMatch(credentials) : this.login(credentials);
	}

	checkMatch(credentials) {
		let pass2 = this.authForm.value.password2;
		let errorMsg = 'Passwords must match.'
		pass2 === credentials.password ? this.signup(credentials) : this.onError({ message: errorMsg })
	}

	signup(credentials) {
		this.auth.signUp(credentials)
		.then(() => this.navCtrl.navigateRoot('/home'))
		.catch(error => this.onError(error))
	}

	login(credentials) {
		this.auth.signInWithEmail(credentials)
		.then(() => this.navCtrl.navigateRoot('/home'))
		.catch(error => this.onError(error))
	}

	onCancel() {
		this.navCtrl.pop();
	}

	onError(error) {
		console.log(error);
	}
}