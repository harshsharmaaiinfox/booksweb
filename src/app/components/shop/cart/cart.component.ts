import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { CartState } from '../../../shared/state/cart.state';
import { UpdateCart, DeleteCart, GetCartItems } from '../../../shared/action/cart.action';
import { AddToWishlist } from '../../../shared/action/wishlist.action';
import { AccountState } from '../../../shared/state/account.state';
import { OrderState } from '../../../shared/state/order.state';
import { AccountUser } from '../../../shared/interface/account.interface';
import { OrderCheckout } from '../../../shared/interface/order.interface';
import { Checkout } from '../../../shared/action/order.action';
import { ProductState } from '../../../shared/state/product.state';
import { GetProducts } from '../../../shared/action/product.action';
import { Product } from '../../../shared/interface/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  @Select(CartState.cartItems) cartItem$: Observable<Cart[]>;
  @Select(CartState.cartTotal) cartTotal$: Observable<number>;
  @Select(CartState.cartHasDigital) cartDigital$: Observable<boolean | number>;
  @Select(AccountState.user) user$: Observable<AccountUser>;
  @Select(OrderState.checkout) checkout$: Observable<OrderCheckout>;
  @Select(ProductState.product) product$: Observable<{ data: Product[]; total: number }>;

  public breadcrumb: Breadcrumb = {
    title: "Cart",
    items: [{ label: 'Cart', active: true }]
  }

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetCartItems());

    // Fetch featured products for empty cart suggestions
    this.store.dispatch(new GetProducts({ status: 1, paginate: 8 }));

    // Calculate Shipping & Tax if user is logged in
    this.user$.subscribe(user => {
      if (user && user.address && user.address.length) {
        const shippingAddress = user.address.find(a => a.is_default) || user.address[0];
        const billingAddress = user.address.find(a => a.is_default) || user.address[0];

        if (shippingAddress) {
          const payload: any = {
            consumer_id: user.id,
            email: user.email,
            products: [],
            shipping_address_id: shippingAddress.id,
            billing_address_id: billingAddress.id,
            payment_method: 'cod',
            delivery_description: 'Standard Delivery',
            delivery_interval: 'Standard'
          };

          this.cartItem$.subscribe(items => {
            if (items && items.length) {
              const products = items.map(item => ({
                product_id: item.product_id,
                variation_id: item.variation_id,
                quantity: item.quantity
              }));

              payload['products'] = products;
              this.store.dispatch(new Checkout(payload));
            }
          });
        }
      }
    });
  }

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item?.id,
      product: item?.product,
      product_id: item?.product?.id,
      variation: item?.variation,
      variation_id: item?.variation_id ? item?.variation_id : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  addToWishlist(item: Cart) {
    this.store.dispatch(new AddToWishlist({ product_id: item.product.id })).subscribe({
      complete: () => {
        this.delete(item.id);
      }
    });
  }

  delete(id: number) {
    this.store.dispatch(new DeleteCart(id));
  }

}
