import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../../../services/weather/weather.service";

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  cityName: string;
  state: string;
  temp: any;
  errorMessage: any;
  maxTemp: number;
  minTemp: number;
  today: string;
  daysForecast: Object;
  hum: number;
  wind: number;

  constructor(private weather: WeatherService) { }

  ngOnInit(): void { }

  @Input() set city(city: string) {
    this.cityName = city;

    this.weather.getWeather(city)
      .subscribe((payload) => {
        this.state = payload.weather[0].main;
        this.temp = Math.ceil(payload.main.temp);
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });


    const todayNumberInWeek = new Date().getDay();
    this.today = days[todayNumberInWeek];

    this.weather.getForecast(city)
      .subscribe((payload) => {
        this.maxTemp = Math.round(payload[0].main.temp);
        this.minTemp = Math.round(payload[0].main.temp);
        this.hum = payload[0].main.humidity;
        this.wind = Math.round(Math.round(payload[0].wind.speed));

        const dates = {};
        for (const res of payload) {
          if (new Date().toLocaleDateString('en-US') === new Date(res.dt_txt).toLocaleDateString('en-US')) {
            this.maxTemp = res.main.temp > this.maxTemp ? Math.round(res.main.temp) : this.maxTemp;
            this.minTemp = res.main.temp < this.minTemp ? Math.round(res.main.temp) : this.minTemp;
          }

          const date = new Date(res.dt_txt).toDateString().split(' ')[0];
          if (dates[date]) {
            dates[date].counter += 1;
            dates[date].temp += res.main.temp;
          } else {
            dates[date] = {
              state: res.weather[0].main,
              temp: res.main.temp,
              counter: 1
            };
          }
        }

        Object.keys(dates).forEach((day) => {
          dates[day].temp = Math.round(dates[day].temp / dates[day].counter);
        });
        delete dates[Object.keys(dates)[0]];
        this.daysForecast = dates;
      }, (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
  }

  sortByDay(a,b) {
    return days.indexOf(a.key) > days.indexOf(b.key) ? 1 : 0
  }
}
