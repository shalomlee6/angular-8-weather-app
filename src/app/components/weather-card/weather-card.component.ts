import { Component, OnInit, Input } from '@angular/core';
import { WeatherCardData } from 'src/app/store/model/weather.card.data';




@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})

export class WeatherCardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('weatherCard')
  weatherCard: WeatherCardData;

  constructor() { }

  ngOnInit() {
  }


}
