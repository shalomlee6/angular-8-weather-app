import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherModel } from '../store/model/weather.model';
// adding "resolveJsonModule": true, to =>  tsconfig.json
import * as data from '../model/data.json';
import * as config from '../config/cofig.api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // deafultCity: WeatherModel = {
  //   key: '215854',
  //   city: 'Tel Aviv'
  // };
  countrys: WeatherModel[] = [];
  constructor(private httpClient: HttpClient) { }


  getDeafultWeather(currentWeather: WeatherModel) {
    return this.httpClient.get(
      config.api.deafult_weather_url +
        currentWeather.key +
        '?apikey=' + config.api.api_key).pipe(
          catchError(this.handleError)
        );
  }

  getFiveDayesForecast(city: WeatherModel) {
    return this.httpClient.get(
      config.api.five_dayes_forecast_url +
       city.key + '?apikey=' +
       config.api.api_key + '&metric=true').pipe(
          catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getLocalWeatherData(): WeatherModel[] {
    // this.httpClient.get(environment.auto_complete_url + '?apikey=' + environment.api_key);
    data.weather.forEach(item => {
      this.countrys.push({key: item.Key, city: item.LocalizedName});
    });
    // console.log(this.countrys);
    return this.countrys;
  }

  getLocalWeatherForcast(): WeatherModel[] {

    data.weather.forEach(item => {
      this.countrys.push({key: item.Key, city: item.LocalizedName});
    });

    return this.countrys;
  }

  getSearchOptions(input) {
    // console.log('api call....');
    // console.log(environment.auto_complete_url + '?apikey=' + environment.api_key + '&q=' + input);
    if (input !== '') {
      return this.httpClient.get(config.api.auto_complete_url + '?apikey=' + config.api.api_key + '&q=' + input);
    }
  }

  getGeoLocation(name) {

    // Get item by country name
    for ( const item of data.weather ) {
      if (item.LocalizedName === name ) {
        return item;
      }
    }
  }
}
