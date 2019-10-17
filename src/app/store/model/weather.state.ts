import { WeatherData } from './weather.data';
import { WeatherCardData } from './weather.card.data';

export interface WeatherState {
  weatherData: WeatherData[];
  WeatherCardData: WeatherCardData[];
  loaded: boolean;
  loading: boolean;
}
