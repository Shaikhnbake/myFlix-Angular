import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', result.user.username);
      localStorage.setItem('token', result.user.token);
      localStorage.setItem('email', result.user.email);
      localStorage.setItem('birthday', result.user.birthday);
      localStorage.setItem('favorites', result.user.topMovies);
      this.dialogRef.close();
      this.snackBar.open(result.username + 'has logged in!', 'OK', { duration: 2000 });
    },
    (result) => {
      this.snackBar.open(result, 'OK', { duration: 2000 });
    }
    );
  }

}
