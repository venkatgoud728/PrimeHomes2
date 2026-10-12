import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Property,
  PropertyImage
} from '../models/property';

import { Property as PropertyService } from '../services/property';
import { InquiryService } from '../services/inquiry';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails implements OnInit {

  property?: Property;

  // ==========================================
  // Gallery Images
  // ==========================================

  galleryImages: PropertyImage[] = [];

  selectedImageUrl: string | null = null;


  // ==========================================
  // Inquiry
  // ==========================================

  inquiryMessage = '';


  // ==========================================
  // Login Information
  // ==========================================

  isLoggedIn = false;

  userRole = '';


  // ==========================================
  // Constructor
  // ==========================================

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private inquiryService: InquiryService,
    private cdr: ChangeDetectorRef
  ) {}


  // ==========================================
  // Page Load
  // ==========================================

  ngOnInit(): void {

    this.isLoggedIn =
      !!localStorage.getItem('token');

    this.userRole =
      localStorage.getItem('role') || '';


    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );


    console.log(
      'Property ID:',
      id
    );


    // ========================================
    // Load Property Details
    // ========================================

    this.propertyService
      .getPropertyById(id)
      .subscribe({

        next: (data) => {

          console.log(
            'Property Details API Response:',
            data
          );


          this.property = data;


          // Initially show main property image
          this.selectedImageUrl =
            data.imageUrl || null;


          console.log(
            'Property Assigned:',
            this.property
          );


          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading property:',
            error
          );

        }

      });


    // ========================================
    // Load Gallery Images
    // ========================================

    this.loadGalleryImages(id);

  }


  // ==========================================
  // Check Property Ownership
  // ==========================================

  isPropertyOwner(): boolean {

    if (!this.property) {
      return false;
    }

    const loggedInUserId =
      Number(localStorage.getItem('userId'));

    return loggedInUserId === this.property.ownerId;
  }


  // ==========================================
  // Load Gallery Images
  // ==========================================

  loadGalleryImages(
    propertyId: number
  ): void {

    this.propertyService
      .getPropertyImages(propertyId)
      .subscribe({

        next: (images) => {

          console.log(
            'Gallery Images API Response:',
            images
          );


          this.galleryImages =
            images;


          console.log(
            'Gallery Images Assigned:',
            this.galleryImages
          );


          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading gallery images:',
            error
          );

        }

      });

  }


  // ==========================================
  // Select Gallery Image
  // ==========================================

  selectGalleryImage(
    imageUrl: string
  ): void {

    this.selectedImageUrl =
      imageUrl;

  }


  // ==========================================
  // Delete Gallery Image
  // ==========================================

  deleteGalleryImage(
    image: PropertyImage
  ): void {

    const confirmed = confirm(
      'Are you sure you want to delete this image?'
    );


    if (!confirmed) {
      return;
    }


    this.propertyService
      .deletePropertyImage(
        image.propertyImageId
      )
      .subscribe({

        next: () => {

          alert(
            'Gallery image deleted successfully.'
          );


          // Remove image from current gallery
          this.galleryImages =
            this.galleryImages.filter(
              x =>
                x.propertyImageId !==
                image.propertyImageId
            );


          // If deleted image was currently selected,
          // show the main property image again
          if (
            this.selectedImageUrl ===
            image.imageUrl
          ) {

            this.selectedImageUrl =
              this.property?.imageUrl || null;

          }


          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error deleting gallery image:',
            error
          );


          alert(
            'Unable to delete gallery image.'
          );

        }

      });

  }


  // ==========================================
  // Send Inquiry
  // ==========================================

  sendInquiry(): void {

    if (!this.property) {
      return;
    }


    if (
      !this.isLoggedIn ||
      this.userRole !== 'Buyer'
    ) {

      alert(
        'Please login as a Buyer to send an inquiry.'
      );

      return;

    }


    if (!this.inquiryMessage.trim()) {

      alert(
        'Please enter a message.'
      );

      return;

    }


    const inquiry = {

      propertyId:
        this.property.propertyId,

      message:
        this.inquiryMessage

    };


    this.inquiryService
      .addInquiry(inquiry)
      .subscribe({

        next: () => {

          alert(
            'Inquiry sent successfully!'
          );


          this.inquiryMessage = '';

        },

        error: (error) => {

          console.error(
            'Error sending inquiry:',
            error
          );


          alert(
            'Unable to send inquiry.'
          );

        }

      });

  }

}