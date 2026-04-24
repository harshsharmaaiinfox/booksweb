import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoaderState } from '../../shared/state/loader.state';
import { Breadcrumb } from '../../shared/interface/breadcrumb';
import { GetNotification } from '../../shared/action/notification.action';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  @Select(LoaderState.status) loadingStatus$: Observable<boolean>;

  public open: boolean = false;
  public breadcrumb: Breadcrumb = {
    title: "Dashboard",
    items: [{ label: 'Dashboard', active: false }]
  };

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new GetNotification());
    this.updateBreadcrumb(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateBreadcrumb(event.urlAfterRedirects || event.url);
    });
  }

  private updateBreadcrumb(url: string) {
    const clean = url.split('?')[0];
    let title = clean.split('/').pop() || 'Dashboard';
    if (clean.includes('order/details')) {
      title = 'Order Details';
    }
    title = title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ');
    this.breadcrumb.title = title;
    this.breadcrumb.items = [{ label: title, active: false }];
  }

  openMenu(value: boolean) {
    this.open = value;
  }

}
