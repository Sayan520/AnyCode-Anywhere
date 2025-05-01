import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../services/theme.service';
import { CodeConvertService } from '../../services/code-convert.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-code-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SplitterModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './code-converter.component.html',
  styleUrl: './code-converter.component.scss',
})
export class CodeConverterComponent implements OnInit {
  inputCode: string = '';
  outputCode: string = '';
  selectedInputLang: any = null;
  selectedOutputLang: any = null;
  isDarkMode: boolean = false;
  isMobileView: boolean = false;
  isConverting: boolean = false;
  downloadUrl: string = '';
  isDownloading: boolean = false;
  copied: boolean = false;


  // Language options for the dropdowns
  programmingLanguages = [
    { name: 'Python', code: 'py' },
    { name: 'JavaScript', code: 'js' },
    { name: 'PHP', code: 'php' },
    { name: 'Java', code: 'java' },
    { name: 'C++', code: 'cpp' },
    { name: 'C', code: 'c' },
    { name: 'C#', code: 'cs' },
    { name: 'TypeScript', code: 'ts' },
    { name: 'SQL', code: 'sql' },
    { name: 'Go', code: 'go' },
    { name: 'Rust', code: 'rs' },
    { name: 'Swift', code: 'swift' },
    { name: 'Dart', code: 'dart' },
    { name: 'Kotlin', code: 'kt' },
    { name: 'Ruby', code: 'rb' },
  ];

  // Inject the theme and conversion services
  constructor(
    private themeService: ThemeService,
    private convertService: CodeConvertService
  ) {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  // Function to toggle the theme
  ngOnInit() {
    this.checkMobileView();
    window.addEventListener('resize', () => this.checkMobileView());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Function to handle the conversion process
  startConversion() {
    this.isConverting = true;

    // payload for the conversion request
    const payload = {
      code: this.inputCode,
      input_language: this.selectedInputLang?.name || 'Python',
      output_language: this.selectedOutputLang?.name || 'JavaScript',
      filename: 'converted_code',
    };

    this.convertService.convertCode(payload).subscribe({
      next: (res) => {
        this.outputCode = res.converted_code;
        this.downloadUrl = `${environment.baseUrl}${res.download_url}`;
        this.isConverting = false;
      },
      error: (err) => {
        console.error('Conversion failed.', err);
        this.outputCode = 'Error occurred during conversion! Please try again.';
        this.isConverting = false;
      },
    });
  }

  // copy the converted code to clipboard
  copyToClipboard() {
    if (this.outputCode) {
      navigator.clipboard
        .writeText(this.outputCode)
        .then(() => {
          this.copied = true; // Set copied state to true
          setTimeout(() => (this.copied = false), 2000); // Reset copied status after 2 seconds
        })
        .catch(() => {
          this.copied = false; // Handle failure case
        });
    }
  }

  // Function to download the converted code
  downloadConvertedCode() {
    if (this.outputCode) {
      this.isDownloading = true; // Set downloading state to true
      const blob = new Blob([this.outputCode], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'converted_code.txt'; // Set the filename for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up the object URL
      setTimeout(() => {
        this.isDownloading = false; // Reset downloading state after a short delay
      }, 2000); // Optional delay to simulate download completion
    } else {
      console.error('No output code available to download.');
    }
  }

  // Function to check if the view is mobile
  checkMobileView() {
    this.isMobileView = window.innerWidth < 768;
  }
}

