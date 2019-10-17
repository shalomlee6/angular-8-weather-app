import { WeatherData } from './weather.data';


export interface AppState {
  readonly weather: WeatherData[];
}
