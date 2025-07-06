import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  countries = input.required<Country[]>()

  errorMessage = input<string | null | unknown>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)
}
