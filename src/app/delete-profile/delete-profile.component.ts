import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})
export class DeleteProfileComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser = JSON.parse(this.user);
  username: any = this.parsedUser.username;

  constructor(
    public dialogRef: MatDialogRef<DeleteProfileComponent>,
    public dialog: MatDialog,
    public fetchData: FetchApiDataService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // this.deleteProfile(this.username);
    // console.log(this.username);
    // console.log(this.user.username);
  }

  deleteProfile(username: string): void {
    this.fetchData.deleteUser(username).subscribe((result: any) => {
      this.username = result;
      console.log(result);
    });
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    this.closeDialog()
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
