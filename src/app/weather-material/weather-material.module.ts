import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

const WeatherMaterialComponents = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule
];

@NgModule({
  imports: [
    WeatherMaterialComponents
  ],
  exports: [
    WeatherMaterialComponents
  ]
})
export class WeatherMaterialModule { }
