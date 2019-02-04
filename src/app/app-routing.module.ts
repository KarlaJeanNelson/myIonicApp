import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: './home/home.module#HomePageModule'
	},
	{
		path: 'companies',
		loadChildren: './companies/companies.module#CompaniesPageModule'
	},
	{ path: 'contacts',
		loadChildren: './contacts/contacts.module#ContactsPageModule'
	},
  { path: 'jobs', loadChildren: './jobs/jobs.module#JobsPageModule' },
  { path: 'tasks', loadChildren: './tasks/tasks.module#TasksPageModule' },
  { path: 'company-modal', loadChildren: './company-modal/company-modal.module#CompanyModalPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
