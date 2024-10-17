import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { CustomTableComponent } from '../../../../shared/components/custom-table/custom-table.component';
import { Vehicle } from '../../models/vehicle.model';
import { VehiclesService } from '../../services/vehicles.service';
import { AddVehicleDialogComponent } from '../add-vehicle-dialog/add-vehicle-dialog.component';

@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CustomTableComponent,
  ],
  providers: [DatePipe],
  templateUrl: './vehicles-page.component.html',
  styleUrl: './vehicles-page.component.scss',
})
export class VehiclesPageComponent implements OnInit {
  public dataSource: Observable<Vehicle[]>;
  public columns = [
    {
      columnDef: 'licensePlate',
      header: 'License Plate',
      cell: (element: Vehicle) => element.licensePlate,
    },
    {
      columnDef: 'category',
      header: 'Category',
      cell: (element: Vehicle) => element.category,
    },
    {
      columnDef: 'ecoType',
      header: 'Eco Type',
      cell: (element: Vehicle) => element.ecoType,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: Vehicle) => element.status,
    },
    {
      columnDef: 'vehicleInsurance',
      header: 'Vehicle Insurance Expiry',
      cell: (element: Vehicle) => this.formatDate(element.insurance.expiryDate),
    },
    {
      columnDef: 'vehicleInspection',
      header: 'Vehicle Inspection Expiry',
      cell: (element: Vehicle) =>
        this.formatDate(element.vehicleInspection.expiryDate),
    },
    {
      columnDef: 'vehicleTachographInspection',
      header: 'Vehicle Tachograph Expiry',
      cell: (element: Vehicle) =>
        this.formatDate(element.tachographInspection.expiryDate),
    },
  ];

  displayedColumns = this.columns.map((c) => c.columnDef);
  private destroyRef = inject(DestroyRef);

  constructor(
    private vehiclesService: VehiclesService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.dataSource = this.vehiclesService.getAllVehicles();
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      width: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.addVehicle(result);
      });
  }

  addVehicle(vehicle: Vehicle): void {
    if (vehicle) {
      this.vehiclesService.addVehicle(vehicle).subscribe({
        next: (res) => {
          console.log('Vehicle added successfully:', res);
          // Refresh the table maybe?
        },
        error: (err) => console.error('Error adding vehicle:', err),
      });
    }
  }
}
