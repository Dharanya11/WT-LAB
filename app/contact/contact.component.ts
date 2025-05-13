import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

// Add this interface
interface ContactForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  message: FormControl<string | null>;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup<ContactForm>;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group<ContactForm>({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  // Update getter to return the typed controls
  get f() { 
    return this.contactForm.controls; 
  }

  submitForm() {
    this.isSubmitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.contactService.submitContactForm(this.contactForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.contactForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error submitting form:', err);
      }
    });
  }
}