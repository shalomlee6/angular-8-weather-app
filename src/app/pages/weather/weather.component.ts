import { Component, OnInit, Input, DoCheck } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Store } from '@ngrx/store';
import { WeatherModel } from 'src/app/store/model/weather.model';
import { AppState } from 'src/app/store/model/app.state';
import { StoreService } from 'src/app/services/store.service';
import { WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {



  cityWeather: WeatherModel;
  optionSelected: WeatherModel;
  newCity: WeatherModel;
  constructor(private weatherService: WeatherService, private route: ActivatedRoute) {

  }


  ngOnInit() {
    const key: string = this.route.snapshot.paramMap.get('key');
    const city: string = this.route.snapshot.paramMap.get('city');

    if (key !== null && city !== null) {
      this.cityWeather = {
        key: key,
        city: city
      };
    } else {
    // Deafult City
      this.cityWeather = {
        key: '215854',
        city: 'Tel Aviv'
      };
    }

    // this.weatherService.weatherData$.subscribe(data => {
    //   if (data !== undefined) {
    //     this.cityWeather = {
    //       key:data.key,
    //       city: data.city
    //     }
    //   } else {
    //     this.cityWeather = this.weatherService.getDeafultState();
    //   }
    // });

  }



  onSelectedCountry(event) {
    // console.log(event);
    this.cityWeather = event;
  }

  // onWeatherSelected(event) {
  //   // console.log('onWeatherSelected => ',event);
  //   // this.cityWeather = event;
  //   this.weatherService.weatherData$.subscribe(data => {
  //     if (data !== undefined) {
  //       this.cityWeather = {
  //         key:data.key,
  //         city: data.city
  //       }
  //     }
  //   });
  // }


}
