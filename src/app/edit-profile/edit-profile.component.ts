import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: any = localStorage.getItem('user');
  parsedUser: any = JSON.parse(this.user);

  @Input() userData: any = {
    username: this.parsedUser.username,
    password: '',
    email: this.parsedUser.email,
    birthday: this.parsedUser.birthday,
  };

  minDate: Date;
  maxDate: Date;

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public dialog: MatDialog,
    public fetchData: FetchApiDataService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear + 100, 11, 31);
  }

  ngOnInit(): void {}

  editProfile(): void {
    this.fetchData.editUser(this.userData).subscribe((result: any) => {
      this.userData = result;
      localStorage.setItem('user', JSON.stringify(result));
      window.location.reload();
      return this.userData;
    });
  }

  deleteProfileOne(): void {
    this.dialog.open(DeleteProfileComponent);
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
