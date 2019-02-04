import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.page.html',
  styleUrls: ['./company-modal.page.scss'],
})
export class CompanyModalPage implements OnInit {
	@Input() header: string;
	@Input() company: any;
	private companyData: FormGroup

	constructor(private fb: FormBuilder, public modalController: ModalController) {
		this.companyData = this.fb.group({
			docId: [''],
			favorite: [false],
			fullname: ['', Validators.required],
			website: [''],
			location: [''],
		})
	}

  ngOnInit() {
		console.log(this.company);
		
		this.companyData.patchValue({
			docId: this.company.docId || '',
			fullname: this.company.fullname,
			website: this.company.website || '',
			location: this.company.location || '',
			favorite: this.company.favorite || false
		})
	}
	
	onSubmit() {
		this.modalController.dismiss({
			submit: true,
			payload: this.companyData.value
		})
	}

	onCancel() {
		this.modalController.dismiss({
			submit: false,
			payload: this.company
		})
	}
}
