import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
	items: Array<string>

  constructor(
	) { }

  ngOnInit() {
		this.items = ["First item", "Second item", "Third item"];
  }

	reorderItems(ev) {
    const itemMove = this.items.splice(ev.detail.from, 1)[0];
    this.items.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
	}
}
