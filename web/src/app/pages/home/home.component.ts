import { Component, OnInit } from '@angular/core';
import {FbService} from "../../services/fb/fb.service";
import {HttpClient} from "@angular/common/http";
import {DataStorageService} from "../../services/data-storage/data-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cities;
  showNoCities = false;
  showError = false;
  displayError;

  constructor(private ds: DataStorageService, private fb: FbService) { }

  ngOnInit(): void {
    this.fb.userData().subscribe((user) => {
      this.ds.getData(`/getCities/${user.uid}`).subscribe((cities: Array<any>) => {
        this.showError = false;
        if (cities.length === 0) {
          this.showNoCities = true;
        }
        this.cities = cities;
      }, (err) => {
        this.displayError = err;
        this.showError = true;
      });
    });
  }

}
