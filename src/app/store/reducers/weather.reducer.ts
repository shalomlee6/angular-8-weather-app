import * as WeatherActions from '../actions/weather.actions';
import { WeatherActionTypes } from '../actions/weather.actions';
import { WeatherData } from '../model/weather.data';
import { WeatherState } from '../model/weather.state';
import { createSelector } from '@ngrx/store';




export const initialState: WeatherState = {
  weatherData: [],
  WeatherCardData: [],
  loaded: false,
  loading: false
};

export function WeatherReducer( state = initialState, action: WeatherActions.WeatherAction ): WeatherState {

  console.log('action', action.type);

  switch ( action.type ) {

    case WeatherActionTypes.LOAD_ITEM: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case WeatherActionTypes.LOAD_ITEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case WeatherActionTypes.LOAD_ITEM_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case WeatherActionTypes.ADD_ITEM: {
      return {
        weatherData: [...state.weatherData, action.payload],
        WeatherCardData: [...state.WeatherCardData],
        loading: false,
        loaded: true
      };
    }
    case WeatherActionTypes.ADD_ITEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case WeatherActionTypes.ADD_ITEM_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case WeatherActionTypes.REMOVE_ITEM: {
      state.weatherData.splice(action.payload, 1);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  case WeatherActionTypes.ADD_WEATHER_CARDS: {
    return {
      weatherData: [...state.weatherData],
      WeatherCardData: [...action.payload],
      loading: false,
      loaded: true
    };
  }
  case WeatherActionTypes.ADD_ITEM_SUCCESS: {
    return {
      ...state,
      loading: false,
      loaded: true
    };
  }
  case WeatherActionTypes.ADD_ITEM_FAILURE: {
    return {
      ...state,
      loading: false,
      loaded: false
    };
  }
    default:
      return state;
  }
}

// Start exporting some states
export const getItems = (state: WeatherState) => state.weatherData;
export const getItemsLoaded = (state: WeatherState) => state.loaded;
export const getItemsLoading = (state: WeatherState) => state.loading;

// Create Selector for details component
export const getWeatherState = createSelector(
  getItems,
  getItemsLoaded,
  getItemsLoading,
  (data: WeatherData[], loaded: boolean, loading: boolean) => {
    return {
      data,
      loaded,
      loading
    };
  }
 );
