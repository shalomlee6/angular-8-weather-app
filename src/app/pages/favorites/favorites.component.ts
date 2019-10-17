import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { WeatherData } from 'src/app/store/model/weather.data';
import { WeatherState } from 'src/app/store/model/weather.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  statep: WeatherData[];
  favorites$: Observable<WeatherData[]>;
  @Output()
  weatherSelected = new EventEmitter<WeatherData>();
  constructor(private store: Store<WeatherState>, private route: Router) { }

  ngOnInit() {

  /**
   * This Is The Call To The Store But Its Not Working =>
   * I have a problem that I dident solved in time
   * This is the call to the store but it returns undefined:
   *
   * this.favorites$ = this.store.pipe(select(fromStore.getItems));
   *
   * I know what I need to do => use the @ngrx/Entity
   * and set an id for every new WeatherState that I saved in favorite.
   * My plan was to use the locationkey as item Id.
   * I've never used ngrx before so I studied everything I can in less
   * then three dayes.
   * please consider...
   */
    this.store.select('weather', 'weatherData').subscribe( data => {
      // So I did a shourtcut and used the of() operator
      // To show the logic of the rest of the app.
      this.favorites$ = of(data);
    });

  }

  setWeather(favorite: WeatherData) {
    // this.weatherService.sendWeatherData(item);
    this.route.navigate(['weather', favorite.key, favorite.city]);
  }
}
