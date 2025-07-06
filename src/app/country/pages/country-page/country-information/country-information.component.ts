import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent {

  country = input.required<Country>()

  currentYear = computed(() => {
    return new Date().getFullYear()
  })
}
