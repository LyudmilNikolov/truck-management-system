import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-page-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, NgIf, NgFor],
  templateUrl: './edit-page-dialog.component.html',
  styleUrl: './edit-page-dialog.component.scss'
})
export class EditPageDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditPageDialogComponent>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({});

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.data.formFields.forEach((field: any) => {
      const value = this.data[field.columnDef] ?? ''; // Use data's value for the control or empty string
      if (!field.group) {
        this.editForm.addControl(
          field.columnDef, 
          this.fb.control(value, Validators.required)
        );
      } else {
        const group = this.fb.group({});
        const groupValue = this.data[field.group]?.[field.columnDef] ?? '';
        group.addControl(field.columnDef, this.fb.control(groupValue));
        this.editForm.addControl(field.group, group);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}
