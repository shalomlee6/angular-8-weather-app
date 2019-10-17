import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WeatherModel } from 'src/app/store/model/weather.model';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchOptions: WeatherModel[];
  myControl = new FormControl();
  filteredOptions: Observable<WeatherModel[]>;
  @Output()
  optionSelected = new EventEmitter<WeatherModel>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Set search control for input value changes
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSelectedCountry(event) {
    // Search for location key
    for ( const item of this.searchOptions) {
      if (item.city === event.option.value) {
        this.optionSelected.emit(item);
        break;
      }
    }
  }


  private _filter(value: string): WeatherModel[] {
    const res: WeatherModel[] = [];
    const filterValue = value.toLowerCase();

    // All letters check
    const letters = /^[a-zA-Z_ ]*$/;
    if (value.match(letters) && value !== '' ) {
      this.apiService.getSearchOptions(value).subscribe( (data: Array<any>) => {
        // TODO => Error Check..
        if (data) {
          data.forEach( item => {
            if (item.LocalizedName.toLowerCase().includes(filterValue)) {
              res.push({key: item.Key, city: item.LocalizedName});
            }
            // this.searchOptions.push({key: item.Key, city: item.LocalizedName});
          });
          // For dynamic search
          this.searchOptions = res;
          // TODO => add a spinner while async call
          return  res;
        }
      });
    }

    // Make an api call if in production mode and value is not empty ADD => && environment.production
    // if (value !== ''  ) {

    //   this.apiService.getSearchOptions(value).subscribe( (data: Array<any>) => {
    //     // TODO => Error Check..
    //     if (data) {
    //       data.forEach( item => {
    //         if (item.LocalizedName.toLowerCase().includes(filterValue)) {
    //           res.push({key: item.Key, city: item.LocalizedName});
    //         }
    //         // this.searchOptions.push({key: item.Key, city: item.LocalizedName});
    //       });
    //       // For dynamic search
    //       this.searchOptions = res;
    //       // TODO => add a spinner while async call
    //       return  res;
    //     }
    //   });
    // }

    return  res;
  }

}
