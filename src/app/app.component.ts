import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './component/cart/service/cart.service';
import { Product } from './model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  cartCount = 0;
  private _mobileQueryListener: () => void;
  subscription :Subscription[]= [];
  cart = new Array<Product>()

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private cartService: CartService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.cart = cartService.cartValue;
    this.cartCount = cartService.cartValue.length;
    var cartCountService = this.cartService.getCartCountEmitter().subscribe(item => this.changeCartCount(item));
    this.subscription.push(cartCountService);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.forEach(element=> {
      element.unsubscribe();
    })
  }

  changeCartCount(item: number){
    this.cartCount = item;
  }

  removeCart(product: Product){
    this.cartService.remove(product);
  }

}
