import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CodeConverterComponent } from './components/code-converter/code-converter.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'convert', component: CodeConverterComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'about', component: AboutComponent },
//   { path: '**', redirectTo: '' } // Fallback to Home
];
