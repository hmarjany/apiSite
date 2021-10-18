import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts = new Array<Product>();
  totalPayment : number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.carts = this.cartService.cartValue;
    this.totalPayment = this.carts.reduce((sum,item)=>sum + (item.price != undefined ? item.price:0)  ,0)
  }

  removeCart(product: Product){
    this.cartService.remove(product);
    this.totalPayment = this.carts.reduce((sum,item)=>sum + (item.price != undefined ? item.price:0)  ,0)
  }

}
