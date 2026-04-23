import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactService } from '../../core/services/contact.service';
import { ContactData, ApiResponse } from '../../core/models/domain.models';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactData: ContactData | null = null;
  safeMapUrl: SafeResourceUrl | null = null;

  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private sanitizer: DomSanitizer,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // Pre-SSR layout mapping
    this.seoService.generateTags({
      title: 'Contact Server',
      description: 'Establish a connection framework. Submit infrastructure inquiries natively via the node transmission endpoints.'
    });

    this.initForm();
    this.fetchContactData();
  }

  private initForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  private fetchContactData() {
    this.contactService.getContactData().subscribe((res: ApiResponse<ContactData>) => {
      if (res.success && res.data) {
        this.contactData = res.data;
        if (this.contactData.mapEmbedUrl) {
           this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.contactData.mapEmbedUrl);
        }
      }
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    this.contactService.submitInquiry(this.contactForm.value).subscribe({
      next: (res: ApiResponse<any>) => {
        this.isSubmitting = false;
        if (res.success) {
          this.submitStatus = 'success';
          this.contactForm.reset();
        } else {
          this.submitStatus = 'error';
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.submitStatus = 'error';
      }
    });
  }

  get f() { return this.contactForm.controls; }
}
