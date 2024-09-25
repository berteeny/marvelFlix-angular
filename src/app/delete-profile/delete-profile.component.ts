import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})

/**
 * This class allows users to permanently delete their profile
 */
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

  ngOnInit(): void {}

  /**
   * This class allows user to permanently delete their profile
   * @param username
   */
  deleteProfile(username: string): void {
    this.fetchData.deleteUser(username).subscribe((result: any) => {
      this.username = result;
      console.log(result);
    });
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
