import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './pages/weather/weather.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';


const routes: Routes = [
  {
    path: '',
    component: WeatherComponent
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'weather/:key/:city',
    component: WeatherComponent
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
