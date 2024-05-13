import { AsyncPipe, DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';

interface Employee {
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  status: string;
  driverId: { card: number; expiryDate: string };
  driverLicense: { card: number; expiryDate: string };
  driverPsycho: { card: number; expiryDate: string };
  driverQualification: { card: number; expiryDate: string };
  driverTachograph: { card: number; expiryDate: string };
  _id: string;
}

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

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.dataSource = this.employeesService.getAllEmployees();
  }
}
