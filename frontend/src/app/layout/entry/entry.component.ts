import { Component, HostListener, OnInit, signal } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [SidebarComponent, MainComponent],
  templateUrl: './entry.component.html',
})
export class EntryComponent implements OnInit {
  isSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsSidebarCollapsed(isSidebarCollapsed: boolean): void {
    this.isSidebarCollapsed.set(isSidebarCollapsed);
  }
}
