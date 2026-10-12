import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import { Property as PropertyService } from '../services/property';

@Component({
  selector: 'app-add-property',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-property.html',
  styleUrl: './add-property.css'
})
export class AddProperty implements OnInit {

  // ==========================================
  // Edit Mode
  // ==========================================

  isEditMode = false;

  propertyId = 0;


  // ==========================================
  // Main Property Image
  // ==========================================

  selectedFile: File | null = null;

  imagePreview: string | null = null;


  // ==========================================
  // Multiple Gallery Images
  // ==========================================

  selectedGalleryFiles: File[] = [];

  galleryPreviews: string[] = [];


  // ==========================================
  // Property Object
  // ==========================================

  property = {

    title: '',

    description: '',

    propertyType: '',

    bhk: 0,

    price: 0,

    area: 0,

    location: '',

    city: '',

    imageUrl: ''

  };


  // ==========================================
  // Constructor
  // ==========================================

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}


  // ==========================================
  // Page Load
  // ==========================================

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      if (params['id']) {

        this.isEditMode = true;

        this.propertyId = Number(params['id']);

        console.log(
          'Edit Property ID:',
          this.propertyId
        );

        this.loadProperty();
      }

    });

  }


  // ==========================================
  // Load Existing Property
  // ==========================================

  loadProperty(): void {

    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe({

        next: (data) => {

          console.log(
            'Property loaded:',
            JSON.stringify(data, null, 2)
          );


          this.property.title =
            data.title;

          this.property.description =
            data.description;

          this.property.propertyType =
            data.propertyType;

          this.property.bhk =
            data.bhk;

          this.property.price =
            data.price;

          this.property.area =
            data.area;

          this.property.location =
            data.location;

          this.property.city =
            data.city;

          this.property.imageUrl =
            data.imageUrl || '';


          // Show existing main image
          this.imagePreview =
            this.property.imageUrl || null;


          this.cdr.detectChanges();


          console.log(
            'Form property after assignment:',
            this.property
          );

        },

        error: (error) => {

          console.error(
            'Error loading property:',
            error
          );

          alert(
            'Unable to load property.'
          );

        }

      });

  }


  // ==========================================
  // Select Main Image
  // ==========================================

  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      input.files &&
      input.files.length > 0
    ) {

      this.selectedFile =
        input.files[0];


      console.log(
        'Selected main image:',
        this.selectedFile.name
      );


      const reader =
        new FileReader();


      reader.onload = () => {

        this.imagePreview =
          reader.result as string;

      };


      reader.readAsDataURL(
        this.selectedFile
      );

    }

  }


  // ==========================================
  // Select Multiple Gallery Images
  // ==========================================

  onGalleryFilesSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    // Convert FileList to array
    const files =
      Array.from(input.files);


    // Store selected files
    this.selectedGalleryFiles =
      files;


    // Clear old previews
    this.galleryPreviews = [];


    // Create preview for each image
    files.forEach(file => {

      const reader =
        new FileReader();


      reader.onload = () => {

        this.galleryPreviews.push(
          reader.result as string
        );

        this.cdr.detectChanges();

      };


      reader.readAsDataURL(file);

    });


    console.log(
      'Selected gallery images:',
      files
    );

  }


  // ==========================================
  // Upload Main Image + Gallery Images
  // ==========================================

  uploadSelectedImage(): void {

    // First upload main image if selected
    if (this.selectedFile) {

      this.propertyService
        .uploadImage(this.selectedFile)
        .subscribe({

          next: (response) => {

            console.log(
              'Main image uploaded:',
              response.imageUrl
            );


            this.property.imageUrl =
              response.imageUrl;


            // Continue with property save
            this.addOrUpdateProperty();

          },

          error: (error) => {

            console.error(
              'Main image upload failed:',
              error
            );

            alert(
              'Unable to upload main image.'
            );

          }

        });

    }

    else {

      // No new main image
      this.addOrUpdateProperty();

    }

  }


  // ==========================================
  // Add / Update Property
  // ==========================================

  addOrUpdateProperty(): void {

    console.log(
      'Sending property:',
      this.property
    );


    // ========================================
    // EDIT PROPERTY
    // ========================================

    if (this.isEditMode) {

      this.propertyService
        .updateProperty(
          this.propertyId,
          this.property
        )
        .subscribe({

          next: (response) => {

            console.log(
              'Property updated successfully:',
              response
            );


            // Upload gallery images after update
            this.uploadGalleryImages();


            alert(
              'Property updated successfully!'
            );


            this.router.navigate([
              '/my-properties'
            ]);

          },

          error: (error) => {

            console.error(
              'Error updating property:',
              error
            );

            alert(
              'Unable to update property.'
            );

          }

        });

    }


    // ========================================
    // ADD NEW PROPERTY
    // ========================================

    else {

      this.propertyService
        .addProperty(this.property)
        .subscribe({

          next: (response) => {

            console.log(
              'Property added successfully:',
              response
            );


            // Get newly created Property ID
            const newPropertyId =
              response.propertyId;


            // Upload gallery images
            this.uploadGalleryImages(
              newPropertyId
            );


            alert(
              'Property added successfully! Waiting for Admin approval.'
            );


            this.router.navigate([
              '/my-properties'
            ]);

          },

          error: (error) => {

            console.error(
              'Error adding property:',
              error
            );

            alert(
              'Unable to add property.'
            );

          }

        });

    }

  }


  // ==========================================
  // Upload Gallery Images
  // ==========================================

  uploadGalleryImages(
    propertyId?: number
  ): void {

    const id =
      propertyId || this.propertyId;


    // No gallery images selected
    if (
      !this.selectedGalleryFiles ||
      this.selectedGalleryFiles.length === 0
    ) {

      console.log(
        'No gallery images selected.'
      );

      return;

    }


    console.log(
      'Uploading gallery images for property:',
      id
    );


    this.propertyService
      .uploadPropertyImages(
        id,
        this.selectedGalleryFiles
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Gallery images uploaded successfully:',
            response
          );

        },

        error: (error) => {

          console.error(
            'Gallery image upload failed:',
            error
          );

          alert(
            'Property saved, but gallery images could not be uploaded.'
          );

        }

      });

  }

}