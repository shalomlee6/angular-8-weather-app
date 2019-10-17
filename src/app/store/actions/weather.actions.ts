import { Action } from '@ngrx/store';
import { WeatherData } from '../model/weather.data';
import { WeatherModel } from '../model/weather.model';
import { WeatherCardData } from '../model/weather.card.data';


export enum WeatherActionTypes {
  LOAD_ITEM = '[ITEM] Load Item',
  LOAD_ITEM_SUCCESS = '[ITEM] Load Item Success',
  LOAD_ITEM_FAILURE = '[ITEM] Load Item Failure',
  GET_ITEMS = '[ITEM] Get Items',
  GET_ITEMS_SUCCESS = '[ITEM] Get Items Success',
  GET_ITEMS_FAILURE = '[ITEM] Get Items Failure',
  ADD_ITEM = '[WEATHER] Add Item',
  ADD_ITEM_SUCCESS = '[WEATHER] Add Item Success',
  ADD_ITEM_FAILURE = '[Weather] Add Item Failure',
  REMOVE_ITEM = '[WEATHER] Remove Item',
  REMOVE_ITEM_SUCCESS = '[WEATHER] Remove Item Success',
  REMOVE_ITEM_FAILURE = '[WEATHER] Remove Item Failure',
  ADD_WEATHER_CARDS = '[WEATHER] Add Weather Cards',
  ADD_WEATHER_CARDS_SUCCESS = '[WEATHER] Add Weather Cards Success',
  ADD_WEATHER_CARDS_FAILURE = '[Weather] Add Weather Cards Failure',
}

export class LoadItemAction implements Action {
  readonly type = WeatherActionTypes.LOAD_ITEM;
  constructor( public payload: WeatherModel ) {}
}

export class LoadItemActionFail implements Action {
  readonly type = WeatherActionTypes.LOAD_ITEM_FAILURE;
  constructor(public payload: any) {}
}

export class LoadItemActionSuccess implements Action {
  readonly type = WeatherActionTypes.LOAD_ITEM_SUCCESS;
  constructor(public payload: WeatherData) {}
}


export class GetItemsAction implements Action {
  readonly type = WeatherActionTypes.GET_ITEMS;

  constructor(public payload: WeatherData[]) {}
}

export class GetItemsActionFail implements Action {
  readonly type = WeatherActionTypes.GET_ITEMS_FAILURE;

  constructor(public payload: any) {}
}

export class GetItemsActionSuccess implements Action {
  readonly type = WeatherActionTypes.GET_ITEMS_SUCCESS;

  constructor(public payload: WeatherData[]) {}
}

export class AddItemAction implements Action {
  readonly type = WeatherActionTypes.ADD_ITEM;

  constructor(public payload: WeatherData) {}
}

export class AddItemActionSuccess implements Action {
  readonly type = WeatherActionTypes.ADD_ITEM_SUCCESS;

  constructor(public payload: WeatherData) {}
}

export class AddItemActionFailure implements Action {
  readonly type = WeatherActionTypes.ADD_ITEM_FAILURE;

  constructor(public payload: any) {}
}

export class RemoveItemAction implements Action {
  readonly type = WeatherActionTypes.REMOVE_ITEM;

  constructor(public payload: number) {}

}

export class AddWeatherCardsAction implements Action {
  readonly type = WeatherActionTypes.ADD_WEATHER_CARDS;

  constructor(public payload: WeatherCardData[]) {}
}

export class AddWeatherCardsActionSuccess implements Action {
  readonly type = WeatherActionTypes.ADD_WEATHER_CARDS_SUCCESS;

  constructor(public payload: WeatherCardData[]) {}
}

export class AddWeatherCardsActionFailure implements Action {
  readonly type = WeatherActionTypes.ADD_WEATHER_CARDS_FAILURE;

  constructor(public payload: any) {}
}

export type WeatherAction = AddItemAction |
AddItemActionSuccess          |
AddItemActionFailure          |
RemoveItemAction              |
GetItemsAction                |
LoadItemAction                |
LoadItemActionSuccess         |
LoadItemActionFail            |
AddWeatherCardsAction         |
AddWeatherCardsActionSuccess  |
AddWeatherCardsActionFailure  ;

