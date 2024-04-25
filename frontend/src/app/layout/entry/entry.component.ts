import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './entry.component.html',
})
export class EntryComponent {}