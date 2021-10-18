import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products = new Array<Product>();
 
  constructor(private cartService: CartService) { 
    var product = new Product();
    product.name = "اشتراک یکساله";
    product.picture = 'https://dummyimage.com/300x300/000/fff';
    product.description = "اشتراک یک ساله تمامی ارزهای موجود در بازار";
    product.price = 400000;
    this.products.push(product);

    var product01 = new Product();
    product01.name = "اشتراک شش ماهه";
    product01.picture = 'https://dummyimage.com/300x300/000/fff';
    product01.description = "اشتراک شش ماهه تمامی ارزهای موجود در بازار";
    product01.price = 250000;
    this.products.push(product01);
  }

  ngOnInit(): void {
  }

  addTocart(product: Product){
    this.cartService.add(product);
  }

}
