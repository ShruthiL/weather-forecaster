import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FbService} from '../../services/fb/fb.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('authform') signupForm: NgForm;
  errorMessage;

  constructor(private fb: FbService, private router: Router) { }

  ngOnInit(): void { }

  signup() {
    this.fb.signup(this.signupForm.value.email, this.signupForm.value.password).subscribe(() => {
      this.router.navigateByUrl('');
    }, (err) => {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

}
