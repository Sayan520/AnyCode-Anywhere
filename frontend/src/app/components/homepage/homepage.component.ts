import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule,Tooltip],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  isDarkMode = false;

  constructor(private router: Router, private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }

  goToConvertPanel() {
    this.router.navigate(['/convert']);
  }
}
