import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.page.html',
  styleUrls: ['./company-modal.page.scss'],
})
export class CompanyModalPage implements OnInit {
	@Input() header: string;
	@Input() company: any;

  ngOnInit() {
    console.log(`${this.company}`)
  }
}
