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
		this.companies = this.db.collection('companies', ref=>ref.orderBy('fullname')).valueChanges();
	}
	
	favoriteCompany(docId, isFavorite){
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
    return await modal.present();
  }

}
