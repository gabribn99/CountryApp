import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? null;

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = linkedSignal<Region | null>(() =>
    this.regions.includes(this.queryParam as Region) ? this.queryParam as Region : 'Europe'
  );

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: { query: params.region }
      })
      return this.countryService.searchByRegion(params.region)
    }
  })
}
