import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weather/weather.service";
import {FbService} from "../../services/fb/fb.service";
import {DataStorageService} from "../../services/data-storage/data-storage.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  capitals: Array<any> = [];
  cardCity: string;
  showNote: boolean = false;
  selectedCity: any;
  showAddCitySuccess: boolean = false;
  showAddCityError: boolean = false;

  constructor(private weather: WeatherService, private fb: FbService, private ds: DataStorageService) { }

  ngOnInit(): void {
    this.ds.getData('https://restcountries.eu/rest/v2/all').subscribe((countries: Array<any>) => {
      countries.forEach((country: any) => {
        if (country.capital.length) {
          this.capitals.push(country.capital);
        }
      });
      this.capitals.sort();
    });
  }

  selectCity(city) {
    if (this.capitals.includes(city)) {
      this.cardCity = city;
      this.showNote = false;
    } else {
      this.showNote = true;
    }
  }

  saveCity(cardCity: string) {
    this.fb.userData().subscribe((user) => {
      this.ds.postData('http://localhost:3000/addCity', {
        uid: user.uid,
        city: cardCity
      }).subscribe(() => {
        this.showAddCitySuccess = true
        setTimeout(() => this.showAddCitySuccess = false, 3000);
      }, () => {
        this.showAddCityError = true
        setTimeout(() => this.showAddCityError = false, 3000);
      });
    });
  }
}
