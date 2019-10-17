import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherData } from '../store/model/weather.data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private _weatherDataSrc = new Subject<WeatherData>();
  weatherData$ = this._weatherDataSrc.asObservable();
  constructor() { }

  getDeafultState() {
    return {      
      key: '215854',
      city: 'Tel Aviv'
    }
  }

  sendWeatherData(data: WeatherData) {
    this._weatherDataSrc.next(data)
  }
} 



