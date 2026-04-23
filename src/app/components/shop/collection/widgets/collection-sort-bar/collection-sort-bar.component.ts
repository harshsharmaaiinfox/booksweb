import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';
import { Params } from '../../../../../shared/interface/core.interface';

@Component({
  selector: 'app-collection-sort-bar',
  templateUrl: './collection-sort-bar.component.html',
  styleUrls: ['./collection-sort-bar.component.scss']
})
export class CollectionSortBarComponent {

  @Input() filter: Params;

  public sorting: Select2Data = [
    { value: 'low-high', label: 'Price: Low to High' },
    { value: 'high-low', label: 'Price: High to Low' },
    { value: 'a-z',      label: 'Name: A – Z' },
    { value: 'z-a',      label: 'Name: Z – A' },
    { value: 'asc',      label: 'Newest First' },
    { value: 'desc',     label: 'Oldest First' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  sortByFilter(data: Select2UpdateEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: data?.value ?? null },
      queryParamsHandling: 'merge',
    });
  }
}
