import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-employee-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, NgIf, NgFor],
  templateUrl: './add-employee-dialog.component.html',
  styleUrl: './add-employee-dialog.component.scss'
})
export class AddEmployeeDialogComponent {
  employeeForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phone: [''],
    role: [''],
    status: [''],
    driverId: this.fb.group({
      card: [''],
      expiryDate: [''],
    }),
    driverLicense: this.fb.group({
      card: [''],
      expiryDate: [''],
    }),
    driverPsycho: this.fb.group({
      card: [''],
      expiryDate: [''],
    }),
    driverQualification: this.fb.group({
      card: [''],
      expiryDate: [''],
    }),
    driverTachograph: this.fb.group({
      card: [''],
      expiryDate: [''],
    }),
  });

  formFields = [
    { label: 'First Name', control: 'firstName' },
    { label: 'Last Name', control: 'lastName' },
    { label: 'Phone', control: 'phone' },
    { label: 'Role', control: 'role' },
    { label: 'Status', control: 'status' },
    { label: 'Driver ID Card', group: 'driverId', control: 'card', type: 'number' },
    { label: 'Driver ID Expiry Date', group: 'driverId', control: 'expiryDate' },
    { label: 'Driver License Card', group: 'driverLicense', control: 'card', type: 'number' },
    { label: 'Driver License Expiry Date', group: 'driverLicense', control: 'expiryDate' },
    { label: 'Driver Psycho Card', group: 'driverPsycho', control: 'card', type: 'number' },
    { label: 'Driver Psycho Expiry Date', group: 'driverPsycho', control: 'expiryDate' },
    { label: 'Driver Qualification Card', group: 'driverQualification', control: 'card', type: 'number' },
    { label: 'Driver Qualification Expiry Date', group: 'driverQualification', control: 'expiryDate' },
    { label: 'Driver Tachograph Card', group: 'driverQualification', control: 'card', type: 'number' },
    { label: 'Driver Tachograph Expiry Date', group: 'driverQualification', control: 'expiryDate' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}