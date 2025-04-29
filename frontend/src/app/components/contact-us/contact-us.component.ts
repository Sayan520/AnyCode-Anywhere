import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { TextareaModule } from 'primeng/textarea';
import { ContactService } from '../../services/contact.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    Tooltip,
    TextareaModule,
    FloatLabelModule,
    FormsModule,
    CardModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  providers: [MessageService],
})
export class ContactUsComponent implements OnInit {
  isDarkMode: boolean = false;
  loading: boolean = false;
  contactForm!: FormGroup;

  // Define the services and formbuilder
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private themeService: ThemeService,
    private contactService: ContactService
  ) {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  // contact us input form initialization
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  // Method to get the form control classes based on validation state
  inputClasses(control: string): string {
    const field = this.contactForm.get(control);
    return field?.invalid && field?.touched ? 'border-red-500' : 'border-gray-300';
  }

  // theme toggle method
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // Method to handle send message
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true; // Start loading
      this.contactService.sendContactForm(this.contactForm.value).subscribe({
        next: (res) => {
          // console.log('Response:', res);
          this.messageService.add({
            severity: 'success',
            summary: 'Message Sent!',
            detail: 'Thank you for contacting us! We will get back to you soon.',
            life: 3000,
            // detail: res?.message || 'Your message has been sent successfully.',
          });

          setTimeout(() => {
            console.log(this.contactForm.value);
            this.contactForm.reset();
            this.loading = false; // Stop loading (after timeout)
          }, 500);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Form Incomplete!',
            detail: 'Please fill out all required fields correctly.',
          });
          console.error(err);
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

}
