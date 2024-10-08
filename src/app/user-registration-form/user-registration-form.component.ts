import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

//closes dialog on success
import { MatDialogRef } from '@angular/material/dialog';

//fetches api calls from api data file
import { FetchApiDataService } from '../fetch-api-data.service';

//displays notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})

/**
 * This class allows users to register a new profile
 */
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  minDate: Date;
  maxDate: Date;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear + 100, 11, 31);
  }

  ngOnInit(): void {}

  //function that sends form input to backend

  /**
   * Allows user to POST new profile to database
   * @param username
   * @param password
   * @param email
   * @param birthday
   * @returns snackbar displaying if registration was successful
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.snackBar.open('Please log in', 'Ok', {
          duration: 2000,
        });
        this.router.navigate(['welcome']);
        this.dialogRef.close();
      },
      (result) => {
        console.log(result);
        this.snackBar.open('That username is already taken', 'Ok', {
          duration: 2000,
        });
      }
    );
  }
}
