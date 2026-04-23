import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { ProductService } from '../../../../../shared/services/product.service';
import { Product, ProductModel } from '../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { Params } from '../../../../../shared/interface/core.interface';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
  selector: 'app-collection-products',
  templateUrl: './collection-products.component.html',
  styleUrls: ['./collection-products.component.scss']
})
export class CollectionProductsComponent implements OnInit, OnChanges {

  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(ThemeOptionState.themeOptions) themeOption$: Observable<Option>;

  @Input() filter: Params;
  @Input() gridCol: string;

  public sortedProduct$: Observable<ProductModel>;
  public gridClass: string = "row g-sm-4 g-3 row-cols-xl-4 row-cols-md-3 row-cols-2 product-list-section";
  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  private filter$ = new BehaviorSubject<Params>({});

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.sortedProduct$ = combineLatest([this.product$, this.filter$]).pipe(
      map(([productModel, filter]) => {
        if (!productModel?.data?.length) return productModel;
        const sortBy = filter?.['sortBy'];
        const sorted = [...productModel.data].sort((a, b) => this.sortProducts(a, b, sortBy));
        return { ...productModel, data: sorted };
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] && this.filter) {
      this.filter$.next(this.filter);
    }
  }

  private sortProducts(a: Product, b: Product, sortBy: string): number {
    const priceA = a.sale_price > 0 ? a.sale_price : a.price;
    const priceB = b.sale_price > 0 ? b.sale_price : b.price;
    switch (sortBy) {
      case 'low-high':  return priceA - priceB;
      case 'high-low':  return priceB - priceA;
      case 'a-z':       return a.name.localeCompare(b.name);
      case 'z-a':       return b.name.localeCompare(a.name);
      case 'asc':       return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
      case 'desc':      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      default:          return 0;
    }
  }

  setGridClass(gridClass: string) {
    this.gridClass = gridClass;
  }
}
