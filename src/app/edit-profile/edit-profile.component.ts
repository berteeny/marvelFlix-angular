import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public dialog: MatDialog,
    public fetchData: FetchApiDataService
  ) {}

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
