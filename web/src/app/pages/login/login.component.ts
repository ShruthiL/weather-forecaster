import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FbService} from '../../services/fb/fb.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('authform') loginForm: NgForm;
  errorMessage: string = '';

  constructor(private fb: FbService, private router: Router) { }

  ngOnInit(): void { }

  login() {
    this.fb.signin(this.loginForm.value.email, this.loginForm.value.password).subscribe(() => {
      this.router.navigateByUrl('');
    },(err) => {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

}
