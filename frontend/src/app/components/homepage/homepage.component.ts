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

  // languageAvatars example
  originalLanguages = [
    {
      name: 'Java',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    },
    {
      name: 'JavaScript',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
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
      name: 'Go',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    },
    {
      name: 'Swift',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    },
    {
      name: 'TypeScript',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      name: 'C#',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    },
    {
      name: 'Dart',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg',
    },
    {
      name: 'Kotlin',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    },
    {
      name: 'C++',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    },
  ];

  // Final list that includes avatars + the "+X"
  languageAvatars: { name: string; image?: string; label?: string }[] = [];
  showAllAvatars: boolean = false;

  ngOnInit() {
    this.updateLanguageAvatars();
  }

  // Handle the logic of showing/hiding avatars
  updateLanguageAvatars() {
    const maxVisible = 5;
    const extraCount = this.originalLanguages.length - maxVisible;

    if (this.showAllAvatars || extraCount <= 0) {
      this.languageAvatars = [...this.originalLanguages];
    } else {
      this.languageAvatars = this.originalLanguages.slice(0, maxVisible);
      this.languageAvatars.push({
        name: 'More languages',
        label: `+${extraCount}`,
      });
    }
  }

  // Expand the avatar group
  onExpandClick() {
    this.showAllAvatars = true;
    this.updateLanguageAvatars();
  }

  // Router and theme service injection
  constructor(private router: Router, private themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  // Navigate to convert panel
  goToConvertPanel() {
    this.router.navigate(['/convert']);
  }
}
