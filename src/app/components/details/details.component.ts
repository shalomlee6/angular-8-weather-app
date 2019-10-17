import { Component, Input, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { WeatherModel } from 'src/app/store/model/weather.model';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngrx/store';

import { WeatherData } from 'src/app/store/model/weather.data';
import { Observable, of } from 'rxjs';
import { WeatherCardData } from 'src/app/store/model/weather.card.data';
import * as actions from 'src/app/store/actions/weather.actions';
import * as config from '../../config/cofig.api';
import { WeatherState } from 'src/app/store/model/weather.state';
import * as fromStore from '../../store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnChanges {

  POSITION = 0;
  isSaved = false;
  defaultSpinner = false;
  fiveDayesForecastingSpinner = false;
  headline: string;
  weatherData: WeatherData;
  weatherDataStoreItem: WeatherData;
  weatherCardData: WeatherCardData[];
  @Input()
  cityWeather: WeatherModel;
  storeData$: Observable<WeatherData[]>;

  constructor(private apiService: ApiService, private store: Store<WeatherState>, private storeService: StoreService) { }

  ngOnChanges(changes: SimpleChanges): void {

    // Start Spinners
    this.defaultSpinner = true;
    this.fiveDayesForecastingSpinner = true;
    this.weatherCardData = [];

    if (changes.cityWeather.currentValue) {

      this.cityWeather = changes.cityWeather.currentValue;

      // Load Item State
      this.store.dispatch(new actions.LoadItemAction(this.cityWeather));

      // Get the data from the store
      this.weatherData = this.storeService.getItemFromStore(this.cityWeather);
      this.weatherCardData = this.storeService.getWeatherCards(this.cityWeather);

      // If undefined get data from the API
      if (this.weatherData === undefined ) {

        // TODO => current weather status api call
        this.apiService.getDeafultWeather(this.cityWeather).subscribe(
          (data: Array<any>) => {
          if (data) {
            this.weatherData = {
              key: this.cityWeather.key,
              city: this.cityWeather.city,
              date: data[this.POSITION].LocalObservationDateTime,
              weatherText: data[this.POSITION].WeatherText,
              weatherIcon: config.api.weather_icons_url + data[this.POSITION].WeatherIcon + '.svg',
              isDayTime:   data[this.POSITION].IsDayTime,
              isSaved: this.isSaved,
              temperature: data[this.POSITION].Temperature.Metric.Value
            };
            this.store.dispatch(new actions.LoadItemActionSuccess(this.weatherData));
          }
        }
        , ( err: any ) => this.store.dispatch(new actions.LoadItemActionFail(err))
        , () => this.defaultSpinner = false
        );
      } else {
        // Update From Store Success
        this.defaultSpinner = false;
      }

      // Five Dayes Forecast API Call a
      if (this.weatherCardData.length === 0) {
        // TODO => 5 days forecast weather  api call
        this.apiService.getFiveDayesForecast(this.cityWeather).subscribe( (data) => {
          if (data) {
            // tslint:disable-next-line: no-string-literal
            this.headline = data['Headline'].Text;
            // tslint:disable-next-line: no-string-literal
            data['DailyForecasts'].forEach( element => {
              this.weatherCardData.push({
                date: element.Date,
                tempValue: element.Temperature.Minimum.Value,
                tempUnit: element.Temperature.Minimum.Unit,
                dayIcon: config.api.weather_icons_url + element.Day.Icon + '.svg',
                dayIconText: element.Day.IconPhrase,
                nightIcon: element.Night.Icon,
                nightIconText: element.Night.IconPhrase
              });
            });
          }
        }
        , ( err: any ) => console.log('Error:\n' + err)
        , () => this.fiveDayesForecastingSpinner = false
        );
      } else {
        this.fiveDayesForecastingSpinner = false;
      }
    }
  }

  saveItem() {
    // Add Items To The Store
    if (!this.weatherData.isSaved) {
      this.weatherData.isSaved = true;
      this.storeService.addItemToStore(this.weatherData);
      this.storeService.addWeatherCardsToStore(this.weatherCardData);
    } else {
      // TODO => Toast msg
      this.store.dispatch(new actions.AddItemActionFailure('AddItemActionFailure cause => RemovingItemAction'));
      this.weatherData.isSaved = false;
      // Remove Item From Store
      this.storeService.removeItemFromStore(this.weatherData);
    }


  }


  @HostBinding('style.backgroundImage')
  getBackgroundImageUrl() {
    if (this.weatherData.isDayTime) {
      return `url(assets/img/day.JPG)`;
    } else {
      return `url(assets/img/night.JPG)`;
    }

  }

}
