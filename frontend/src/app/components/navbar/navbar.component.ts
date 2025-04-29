import { CommonModule } from '@angular/common';
import { Component,OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,ButtonModule,SidebarModule,RouterModule,Menu],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  isDarkMode: boolean = false;
  menuOpen: boolean = false;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }

  // menu items for the sidebar
  ngOnInit() {
    this.menuItems = [
      {
        label: 'Contact',
        icon: 'pi pi-phone',
        routerLink: '/contact'
      },
      {
        label: 'About Us',
        icon: 'pi pi-info-circle',
        routerLink: '/about'
      }
    ];
  }

  // menu items for side bar
  toggleMenu(event: Event, menu: Menu) {
    menu.toggle(event);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // close the menu when clicking outside of it
  closeMenu() {
    this.menuOpen = false;
  }
}
