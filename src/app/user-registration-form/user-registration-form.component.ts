import { Component, OnInit, Input } from '@angular/core';

//Closes dialog on sucess
import { MatDialogRef } from '@angular/material/dialog';

//Fetches API calls
import { UserRegistrationService } from '../fetch-api-data.service';

//displays notifcations to user
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  //Function sens form inputs to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //PUT SUCCESFUL USER REGISTRATION LOGIC HERE
      this.dialogRef.close(); //closes modal on success
      console.log(result);
      this.snackBar.open('User registered!', 'OK', { duration: 2000 });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}

