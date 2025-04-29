import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule,DividerModule, CardModule,TabViewModule,PanelModule,FieldsetModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
   isDarkMode: boolean = false;

     // Inject the theme and conversion services
      constructor(
        private themeService: ThemeService
      ) {
        this.themeService.isDarkMode$.subscribe((mode) => {
          this.isDarkMode = mode;
        });
      }

    toggleTheme() {
      this.themeService.toggleTheme();
    }
    whyChooseUsPoints = [
      { title: 'Comprehensive Language Support',
        description: 'Instantly convert between Python, JavaScript, Java, C++, C#, Go, PHP, Swift, Kotlin, Ruby, R, and many more languages.'
      },
      { title: 'Fast and Reliable Results',
        description: 'Smart algorithms preserve functionality and adapt to best practices.'
      },
      { title: 'User-Friendly Interface',
        description: 'Clean and intuitive, perfect for all skill levels.'
      },
      { title: '100% Web-Based',
        description: 'No installations required — access from any device, anytime.'
      },
      { title: 'Privacy First',
        description: 'Your code is never stored. Secure and private.'
      },
    ];

    howItWorksSteps = [
      { title: 'Code Parsing',
        description: 'Our engine analyzes the structure, syntax, and intent.'
      },
      { title: 'Intelligent Translation',
        description: 'Converts while preserving functionality and style.'
      },
      { title: 'Optimization and Output',
        description: 'Final optimization for readability and best practices.'
      },
    ];

    whoBenefitsPoints = [
      { title: 'Developers',
        description: 'Quickly adapt projects across languages.'

      },
      { title: 'Students',
        description: 'Learn how code translates between languages.'

      },
      { title: 'Software Engineers',
        description: 'Speed up multilingual app development.'

      },
      { title: 'Data Scientists',
        description: 'Easily shift code between Python, R, and Julia.'

      },
      { title: 'Hobbyists',
        description: 'Experiment and explore new languages effortlessly.'

      },
    ];

    howToConvertSteps = [
      { step: 'Paste your source code into our conversion tool.' },
      { step: 'Choose your desired output language.' },
      { step: 'Hit “Convert” — and get your ready-to-use code instantly!' },
    ];
  }
