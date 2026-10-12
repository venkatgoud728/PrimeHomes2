import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Property } from '../models/property';
import { Property as PropertyService } from '../services/property';
import { PropertyBadgeService } from '../services/property-badge';


@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  properties: Property[] = [];

  constructor(
    private propertyService: PropertyService,
  private propertyBadgeService: PropertyBadgeService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getAllPropertiesForAdmin().subscribe({
      next: (data) => {
        this.properties = data;

        console.log('All Properties:', data);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading properties:', error);
      }
    });
  }

  approveProperty(property: Property): void {
    this.propertyService.approveProperty(property.propertyId).subscribe({
      next: () => {
        alert('Property approved successfully.');
        this.loadProperties();
      },
      error: (error) => {
        console.error('Error approving property:', error);
        alert('Unable to approve property.');
      }
    });
  }

  rejectProperty(property: Property): void {
    this.propertyService.rejectProperty(property.propertyId).subscribe({
      next: () => {
        alert('Property rejected successfully.');
        this.loadProperties();
      },
      error: (error) => {
        console.error('Error rejecting property:', error);
        alert('Unable to reject property.');
      }
    });
  }


  updateBadge(property: Property, badge: string | null): void {

  this.propertyBadgeService
    .updateBadge(property.propertyId, badge)
    .subscribe({
      next: (response) => {

        console.log('Badge updated:', response);

        property.badge = response.badge;

        alert(
          response.badge
            ? `Property badge updated to ${response.badge}.`
            : 'Property badge removed.'
        );

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Error updating property badge:', error);

        alert(
          error.error?.message ||
          'Unable to update property badge.'
        );
      }
    });
}

}