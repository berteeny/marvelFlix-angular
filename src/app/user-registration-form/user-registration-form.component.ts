import { Component, OnInit, Input } from '@angular/core';

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
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //function that sends form input to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        //logic for user reg here later

        this.dialogRef.close();
        console.log(result);
        this.snackBar.open(result, 'Ok', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'Ok', {
          duration: 2000,
        });
      }
    );
  }
}
