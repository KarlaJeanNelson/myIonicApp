import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
	{ path: 'companies', loadChildren: './companies/companies.module#CompaniesPageModule' },
	{ path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'jobs', loadChildren: './jobs/jobs.module#JobsPageModule' },
  { path: 'tasks', loadChildren: './tasks/tasks.module#TasksPageModule' },
	{ path: 'signup',
		loadChildren: './auth/auth.module#AuthPageModule',
		data: {
			header: 'Sign up',
			icon: 'person-add',
		}
	},
	{ path: 'login',
		loadChildren: './auth/auth.module#AuthPageModule',
		data: {
			header: 'Log in',
			icon: 'log-in',
		}
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
