import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss'],
})
export class SynopsisDialogComponent implements OnInit {
  movie: any;

  constructor(
    public dialogRef: MatDialogRef<SynopsisDialogComponent>,
    public fetchSynopsis: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  ngOnInit(): void {
    this.getSynopsis(this.movie.title);
  }

  getSynopsis(title: string): void {
    this.fetchSynopsis.getMovie(title).subscribe((result: any) => {
      this.data = result;
      return this.data;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
