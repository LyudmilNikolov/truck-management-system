/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { EditPageDialogComponent } from '../edit-page-dialog/edit-page-dialog.component';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    TitleCasePipe,
    AsyncPipe,
    NgIf,
    NgFor,
    MatMenuModule,
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
})
export class CustomTableComponent implements OnInit {
  @Input() columns: any[];
  @Input() data: Observable<any[]>;
  displayedColumns: string[];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c) => c.columnDef);
    if (!this.displayedColumns.includes('actions')) {
      this.displayedColumns.push('actions');
    }
  }

  edit(item: any) {
    console.log('Edit action on:', item);
    const dialogRef = this.dialog.open(EditPageDialogComponent, {
      width: '450px',
      data: { ...item, formFields: this.columns }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        // Update the data
      }
    });
  }

  delete(item: any) {
    console.log('Delete action on:', item);
    // TODO
  }
}
