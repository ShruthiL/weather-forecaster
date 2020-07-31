import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FbService} from "../../../services/fb/fb.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isNavBarExpanded = false;
  isLoggedIn: Observable<boolean>

  constructor(private fb: FbService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.fb.isAuth();
  }

  onLogout() {
    this.toggleNavBar()
    this.router.navigateByUrl('/login');
    this.fb.signout();
    this.isLoggedIn = this.fb.isAuth()
  }

  toggleNavBar() {
    this.isNavBarExpanded = !this.isNavBarExpanded
  }

}
