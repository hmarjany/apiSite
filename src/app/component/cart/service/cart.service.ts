import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<Product[]>;
  public cart: Observable<Product[]>;
  cartCount: EventEmitter<number> = new EventEmitter();
  
  constructor() { 
    this.cartSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('cartApiSite') || '{}'));
    this.cart = this.cartSubject.asObservable();
  }

  public get cartValue(): Product[] {
    return this.cartSubject.value;
  }

  add(product: Product) {
    var cartArray = this.cartValue;
    if(cartArray.length === undefined){
      cartArray = new Array<Product>();
    }
    var exist = cartArray.find(x=> x.description === product.description);
    if(exist){
      return;
    }
    cartArray.push(product);
    localStorage.setItem('cartApiSite', JSON.stringify(cartArray));
    this.cartSubject.next(cartArray);
    this.cartCount.emit(cartArray.length);
  }

  remove(product: Product) {
    var cartArray = this.cartValue as Product[];
    var exist = cartArray.find(x=> x.description === product.description) as Product;
    var index = cartArray.indexOf(exist);
    if (index !== -1) {
      cartArray.splice(index, 1);
    }
    localStorage.setItem('cartApiSite', JSON.stringify(cartArray));
    this.cartSubject.next(cartArray);
    this.cartCount.emit(cartArray.length);
  }

  getCartCountEmitter(){
    return this.cartCount;
  }
  
  clear() {
    localStorage.removeItem('cartApiSite');
    this.cartSubject.next([]);
    this.cart = this.cartSubject.asObservable();
    this.cartCount.emit(0);
  }
}
