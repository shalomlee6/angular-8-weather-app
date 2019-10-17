import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
      if (this.weatherData === undefined || this.weatherCardData === undefined) {

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
        // Update From Store Success
        this.defaultSpinner = false;
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

  removeItem() {
  /**
   * This Is The Call To The Store But Its Not Working =>
   * I have a problem that I dident solved in time
   * This is the call to the store but it returns undefined:
   *
   * this.storeData$ = this.store.pipe(select(fromStore.getItems));
   *
   * I know what I need to do => use the @ngrx/Entity
   * and set an id for every new WeatherState that I saved in favorite.
   * My plan was to use the locationkey as item Id.
   * I will continue to develope until I will have an awesome app to display.
   * The problem is that I've never used ngrx before so I studied everything
   * I can in less then three dayes due to the holidayes.
   * please consider...
   */
  this.store.select('weather', 'weatherData').subscribe( data => {
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < data.length; i++) {
      if ( data[i].key === this.weatherData.key ) {
        // Remove Action Here
        this.store.dispatch(new actions.RemoveItemAction(i));
      }
    }
  });
  }

  // loadWeatherDataFromStoreCheck(): boolean {
  // /**
  //  * This Is The Call To The Store But Its Not Working =>
  //  * I have a problem that I dident solved in time
  //  * This is the call to the store but it returns undefined:
  //  *
  //  * this.storeData$ = this.store.pipe(select(fromStore.getItems));
  //  *
  //  * I know what I need to do => use the @ngrx/Entity
  //  * and set an id for every new WeatherState that I saved in favorite.
  //  * My plan was to use the locationkey as item Id.
  //  * I will continue to develope until I will have an awesome app to display.
  //  * The problem is that I've never used ngrx before so I studied everything
  //  * I can in less then three dayes due to the holidayes.
  //  * please consider...
  //  */

  //   this.store.select('weather', 'weatherData').subscribe( data => {
  //     // tslint:disable-next-line: prefer-for-of
  //     for ( let i = 0; i < data.length; i++) {
  //       if ( data[i].key === this.cityWeather.key ) {
  //         // Item In Store
  //         this.weatherData = data[i];
  //         return true;
  //       }
  //     }
  //   });
  // }

}
