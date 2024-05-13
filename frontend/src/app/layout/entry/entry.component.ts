import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [SidebarComponent, BodyComponent],
  templateUrl: './entry.component.html',
})
export class EntryComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;

  toggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}