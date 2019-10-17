import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/model/app.state';
import { WeatherModel } from '../store/model/weather.model';
import { WeatherData } from '../store/model/weather.data';
import * as actions from 'src/app/store/actions/weather.actions';
import { WeatherCardData } from '../store/model/weather.card.data';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private store: Store<AppState>) { }

  getCurrentState() {
    return this.store.select(appstate => appstate.weather);
  }

  getItemFromStore(city: WeatherModel): WeatherData {
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
    // tslint:disable-next-line: no-unnecessary-initializer
    let weatherData: WeatherData = undefined;
    this.store.select('weather', 'weatherData').subscribe( data => {
      // tslint:disable-next-line: prefer-for-of
      // tslint:disable-next-line: prefer-const
      for ( let item of data) {
        if (item.key === city.key) {
          weatherData = item;
          return weatherData;
        }
      }
    });
    return weatherData;
  }

  getWeatherCards(city: WeatherModel): WeatherCardData[] {
    let weatherCardData: WeatherCardData[] = [];

    this.store.select('weather', 'WeatherCardData').subscribe( data => {
      weatherCardData = data;
    });
    return weatherCardData;
  }

  addItemToStore(item: WeatherData) {
    this.store.dispatch(new actions.AddItemAction(item));
  }

  addWeatherCardsToStore(data: WeatherCardData[]) {
    this.store.dispatch(new actions.AddWeatherCardsAction(data));
  }

  removeItemFromStore(item: WeatherData) {
  // TODO => Remove Item From Store
  this.store.select('weather', 'weatherData').subscribe( data => {
    // tslint:disable-next-line: prefer-for-of
    for ( let i = 0; i < data.length; i++) {
      if ( data[i].key === item.key ) {
        // Remove Action Here
        this.store.dispatch(new actions.RemoveItemAction(i));
      }
    }
  });
  }
}
