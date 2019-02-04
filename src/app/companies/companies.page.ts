import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CompanyModalPage } from '../company-modal/company-modal.page'

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})

export class CompaniesPage implements OnInit {
	companies: Observable<any>;
  constructor(private db: AngularFirestore, public modalController: ModalController) {}
	
	ngOnInit() {
		this.getCompanies();
	}

	getCompanies() {
		this.companies = this.db.collection('companies', ref=>ref.orderBy('fullname')).valueChanges()
	}
	
	favoriteCompany(docId: string, isFavorite: boolean){
		this.db.collection('companies').doc(docId).set({favorite: !isFavorite}, {merge: true})
	}

	async presentModal(header: string, company: any) {
    const modal = await this.modalController.create({
      component: CompanyModalPage,
      componentProps: { 
				header: header,
        company: company,
      }
    });
		await modal.present();
		const { data } = await modal.onDidDismiss();
		const docId = data.payload.docId;
		const updates = Object.assign({}, data.payload);
		delete updates.docId;

		if (data.submit && docId) {
			this.db.collection('companies').doc(docId).set(data.payload)
			.then()
			.catch(error => console.log(error))
		} else if (data.submit) {
			this.addNew(updates)
		}
	}

	addNew(updates) {
		let newId = this.db.createId();
		console.log(newId, updates);
		
		this.db.collection('companies').doc(newId).set({docId: newId, ...updates})
		.then()
		.catch(error => console.log(error))
	}

}
