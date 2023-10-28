import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordGroup } from 'src/app/shared/validators/match-password-validator';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { getAuth, updateProfile } from 'firebase/auth';
import { ToggleService } from 'src/app/shared/services/toggle.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { fullNameValidator } from 'src/app/shared/validators/full-name-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  error: string = '';
  isToggled: boolean;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(6)],
    ],
    pass: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: [],
      },
      { validators: [matchPasswordGroup('password', 'rePassword')] }
    ),
  });

  constructor(public authService: AuthService, private fb: FormBuilder,  private router: Router, private toggleService: ToggleService, private db: AngularFireDatabase) {}

  createUser(uid: string, data: any) {
    return this.db.object(`users/${uid}`).set(data);
  }

  registerMe() {
    const { name, email, pass: {password} = {} } = this.form.value;
    this.authService.SignUp(email!, password!).then((result) => {
      if (result) {
        let code = result.code;
        switch (code) {
          case 'auth/email-already-in-use':
            this.error = 'Email already in use!';
            break;
          case 'auth/invalid-email':
            this.error = 'Invalid email!';
            break;
          case 'auth/weak-password':
            this.error = 'Password should be at least 6 characters!';
            break;
          default:
            this.error = 'Unknown error! Please contact the administrator!';
            break;
        }
      } else {
        this.router.navigate(['/']);
      }
      const auth = getAuth();
      updateProfile(auth.currentUser!, {
        displayName: name,
        photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg'
      });
      this.createUser(auth.currentUser.uid, {
        name: name,
        email: email,
        role: this.isToggled ? 'business' : 'user',
      });
    });
  }

  ngOnInit() {
    this.toggleService.toggle$.subscribe(value => {
      this.isToggled = value;
      const nameControl = this.form.get('name');
      if(!this.isToggled) {
        nameControl?.setValidators([Validators.required, Validators.minLength(4), fullNameValidator()]);
      }else {
        nameControl?.setValidators([Validators.required, Validators.minLength(4)]);
      }

      nameControl?.updateValueAndValidity();
    });
  }
}
