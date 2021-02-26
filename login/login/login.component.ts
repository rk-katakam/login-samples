import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '@core/data/users.service';
import { GlobalEventsManager } from '@core/data/global-events-manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private globalEventsManager: GlobalEventsManager,
    private router: Router,
    private userService: UserService) {
    // Build Login form
    this.buildForm();

  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      mobile: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    console.log('Values:- ', this.loginForm.value);
    console.log('Valid:-', this.loginForm.valid);
    if (this.loginForm.valid) {
      this.globalEventsManager.toggleLoader(true);
      setTimeout(() => {
        this.userService.setUser(this.loginForm.value);
        this.globalEventsManager.toggleLoader(false);
        this.router.navigateByUrl('dashboard');
      }, 2000)
    }


  }

  ngOnDestroy(): void {
  }

}
