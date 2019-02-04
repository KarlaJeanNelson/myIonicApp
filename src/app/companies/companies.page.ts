import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
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
  constructor(
		private db: AngularFirestore,
		public modalController: ModalController,
		public alertController: AlertController,
		public toastController: ToastController
	) {}
	
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

	async deleteDoc(id) {
		const message = 'Are you sure you want to delete this record?';
		const buttons = [
			{
				text: 'Delete',
				role: 'delete',
			},
			{
				text: 'Cancel',
				role: 'cancel'
			}
		]
		const alert = await this.presentAlert('Confirm Delete', message, buttons)
		// console.log(alert);
		
		if (alert === 'delete') {
			this.db.collection('companies').doc(id).delete()
			.then(() => this.presentToast('Record deleted!', 'success'))
			.catch(error => console.log(error))
		}
	}

	async presentAlert(header, message, buttons) {
		const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons
    });

		await alert.present();
		const { role } = await alert.onDidDismiss();
		return role;
	}

	async presentToast(message, color) {
    const toast = await this.toastController.create({
			message: message,
			color: color,
			position: 'bottom',
      duration: 2000
    });
		toast.present();
	}
}
