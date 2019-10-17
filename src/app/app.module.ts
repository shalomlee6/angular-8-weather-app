import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherMaterialModule } from './weather-material/weather-material.module';
import { WeatherComponent } from './pages/weather/weather.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { StoreModule } from '@ngrx/store';
import { WeatherReducer } from './store/reducers/weather.reducer';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { StoreDevtoolsModule  } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    FavoritesComponent,
    SearchComponent,
    DetailsComponent,
    WeatherCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      weather: WeatherReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    WeatherMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
