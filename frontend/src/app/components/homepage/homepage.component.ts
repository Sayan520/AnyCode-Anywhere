import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, Tooltip, Avatar, AvatarGroup],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  isDarkMode = false;

  //  languageAvatars example
  originalLanguages = [
    {
      name: 'Python',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'HTML5',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      name: 'C++',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    },
    {
      name: 'JavaScript',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'Java',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'PHP',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    },
    {
      name: 'TypeScript',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      name: 'CSS3',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    {
      name: 'Ruby',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    },
  ];

  // Final list that includes avatars + the "+X"
  languageAvatars: { name: string; image?: string; label?: string }[] = [];

  ngOnInit() {
    const maxVisible = 5;
    const extraCount = this.originalLanguages.length - maxVisible;

    this.languageAvatars = this.originalLanguages.slice(0, maxVisible);

    if (extraCount > 0) {
      this.languageAvatars.push({
        name: 'More languages',
        label: `+${extraCount}`,
      });
    }
  }

  constructor(private router: Router, private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  goToConvertPanel() {
    this.router.navigate(['/convert']);
  }
}
