import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { Params } from '../../../../../shared/interface/core.interface';
import { AttributeModel } from '../../../../../shared/interface/attribute.interface';
import { AttributeState } from '../../../../../shared/state/attribute.state';
import { GetAttributes } from '../../../../../shared/action/attribute.action';
import { BrandState } from '../../../../../shared/state/brand.state';
import { BrandModel } from '../../../../../shared/interface/brand.interface';
import { Select2Data, Select2UpdateEvent } from 'ng-select2-component';

@Component({
  selector: 'app-collection-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class CollectionSidebarComponent implements OnInit {

  @Input() filter: Params;
  @Input() hideFilter: string[];

  @Select(AttributeState.attribute) attribute$: Observable<AttributeModel>;
  @Select(BrandState.brand) brand$: Observable<BrandModel>;

  public sorting: Select2Data = [
    { value: 'low-high', label: 'Price: Low to High' },
    { value: 'high-low', label: 'Price: High to Low' },
    { value: 'a-z',      label: 'Name: A – Z' },
    { value: 'z-a',      label: 'Name: Z – A' },
    { value: 'asc',      label: 'Newest First' },
    { value: 'desc',     label: 'Oldest First' },
  ];

  constructor(
    private store: Store,
    public attributeService: AttributeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetAttributes({ status: 1 }));
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }

  sortByFilter(data: Select2UpdateEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: data?.value ?? null },
      queryParamsHandling: 'merge',
    });
  }

}
