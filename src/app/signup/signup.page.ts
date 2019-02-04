import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html'
})
export class SignupPage {
	signupError: string;
	form: FormGroup;

	constructor(
		fb: FormBuilder,
		private auth: AuthService,
		private navCtrl: NavController
	) {
		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
	}

	onSubmit() {
		let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};

		this.auth.signUp(credentials)
		.then(() => this.navCtrl.navigateRoot('/home'))
		.catch(error => console.log(error))
	}

}