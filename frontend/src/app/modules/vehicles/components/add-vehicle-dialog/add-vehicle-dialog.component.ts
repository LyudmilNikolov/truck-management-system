import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-vehicle-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, NgIf, NgFor],
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrl: './add-vehicle-dialog.component.scss'
})
export class AddVehicleDialogComponent {
  vehicleForm = this.fb.group({
    licensePlate: [''],
    category: [''],
    ecoType: [''],
    VIN: [''],
    make: [''],
    vehicleModel: [''],
    year: [''],
    insurance: this.fb.group({
      type: [''],
      period: [''],
      expiryDate: [''],
      provider: ['']
    }),
    vehicleInspection: this.fb.group({
      expiryDate: ['']
    }),
    tachographInspection: this.fb.group({
      expiryDate: ['']
    }),
    status: [''],
    currentLocation: [''],
    assignedDriver: ['']
  });

  formFields = [
    { label: 'License Plate', control: 'licensePlate' },
    { label: 'Category', control: 'category' },
    { label: 'Eco Type', control: 'ecoType' },
    { label: 'VIN', control: 'VIN' },
    { label: 'Make', control: 'make' },
    { label: 'Vehicle Model', control: 'vehicleModel' },
    { label: 'Year', control: 'year', type: 'number' },
    { label: 'Status', control: 'status' },
    { label: 'Current Location', control: 'currentLocation' },
    { label: 'Assigned Driver', control: 'assignedDriver' },
    { label: 'Insurance Type', group: 'insurance', control: 'type' },
    { label: 'Insurance Period', group: 'insurance', control: 'period' },
    { label: 'Insurance Expiry Date', group: 'insurance', control: 'expiryDate' },
    { label: 'Insurance Provider', group: 'insurance', control: 'provider' },
    { label: 'Vehicle Inspection Expiry', group: 'vehicleInspection', control: 'expiryDate' },
    { label: 'Tachograph Inspection Expiry', group: 'tachographInspection', control: 'expiryDate' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddVehicleDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}