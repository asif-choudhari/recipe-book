import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

interface HelperText {
  text: string
  error: boolean
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ["./auth.component.css"]
})

export class AuthComponent implements OnInit {
  loginMode: boolean = true;
  loadingSpinner: boolean = false;
  authForm: FormGroup;
  labelDisplay: boolean = false;
  helperText: HelperText = {text: '', error: false};

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  async onSubmit(): Promise<void>{
    const { email, password } = this.authForm.value;
    this.loadingSpinner = true;

    const { data, error } =
      this.loginMode
        ? await this.authService.signIn(email, password)
        : await this.authService.signUp(email, password)
    const { user, session } = data

    if (!this.loginMode) {
      this.helperText = { error: false, text: "Signed Up sucessfull" }
      this.labelDisplay = true;
      setTimeout(() => {
        this.labelDisplay = false;
      }, 5000);
      console.log(this.helperText);
      this.router.navigate(["/auth"]);
    }
    else if (user && this.loginMode) {
      console.log("logged in with user : " + user.id);
      const { data, error } = await this.authService.getSession();
      this.authService.userChanges.next(true);
      this.router.navigate(['']);
    }
    else {
      this.helperText = { error: true, text: error.message }
      this.labelDisplay = true;
      setTimeout(() => {
        this.labelDisplay = false;
      }, 5000);
      console.log(this.helperText);
    }
    this.loadingSpinner = false;
  }

}
