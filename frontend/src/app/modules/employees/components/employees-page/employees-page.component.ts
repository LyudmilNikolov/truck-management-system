import { AsyncPipe, DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule, TitleCasePipe, DatePipe, AsyncPipe, NgIf, NgFor],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {
  public dataSource: Observable<Employee[]>;
  public columns = [
    { columnDef: 'name', header: 'Name', cell: (element: Employee) => `${element.firstName} ${element.lastName}` },
    { columnDef: 'phone', header: 'Phone', cell: (element: Employee) => element.phone },
    { columnDef: 'role', header: 'Role', cell: (element: Employee) => element.role },
    { columnDef: 'status', header: 'Status', cell: (element: Employee) => element.status },
    { columnDef: 'driverIdExpiry', header: 'Driver ID Expiry', cell: (element: Employee) => element.driverId.expiryDate },
    { columnDef: 'driverLicenseExpiry', header: 'Driver License Expiry', cell: (element: Employee) => element.driverLicense.expiryDate },
    { columnDef: 'driverPsychoExpiry', header: 'Driver Psycho Expiry', cell: (element: Employee) => element.driverPsycho.expiryDate },
    { columnDef: 'driverQualificationExpiry', header: 'Driver Qualification Expiry', cell: (element: Employee) => element.driverQualification.expiryDate },
    { columnDef: 'driverTachographExpiry', header: 'Driver Tachograph Expiry', cell: (element: Employee) => element.driverTachograph.expiryDate }
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  private destroyRef = inject(DestroyRef);

  constructor(private employeesService: EmployeesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = this.employeesService.getAllEmployees();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      this.addEmployee(result);
    });
  }

  addEmployee(employee: Employee): void {
    if (employee) {  
      this.employeesService.addEmployee(employee).subscribe({
        next: res => {
          console.log('Employee added successfully:', res);
          // Refresh the table maybe?
        },
        error: err => console.error('Error adding employees:', err)
      });
    }
  }
}
