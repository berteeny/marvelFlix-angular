import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss'],
})
 /**
 * This class allows user to read info about the director of selected movie
 * @param directorName
 */

export class DirectorDialogComponent implements OnInit {
  movie: any;

  constructor(
    public dialogRef: MatDialogRef<DirectorDialogComponent>,
    public fetchDirectors: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
