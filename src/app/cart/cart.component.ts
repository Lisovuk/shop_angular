import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductsService, Product } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: { product: Product, count: number }[] = [];
  currency: string = this.productService.currency;
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private productService: ProductsService) { }

  ngOnInit() {
    this.getCart();
    this.cartSubscription = this.cartService.cart$.subscribe(
      cartItems => {
        this.cart = cartItems;
      }
    );
  }

  get totalPrice(): number {
    let total = 0;
    this.cart.forEach(item => {
      total += item.product.price * item.count;
    });
    return total;
  }

  getCart() {
    this.cartService.getCart().subscribe(
      data => {
        this.cart = data;
      },
      error => {
        console.error('Ошибка при получении данных:', error);
      }
    );
  }

  increaseCount(productId: number, productCount: number) {
    this.cartService.countChange(productId, 1, productCount).subscribe(
      (count: number) => {
        productCount = count;
        this.updateProductCount(productId, productCount);
      },
      error => {
        console.error('Error changing count in cart:', error);
      }
    );
  }

  decreaseCount(productId: number, productCount: number) {
    this.cartService.countChange(productId, -1, productCount).subscribe(
      (count: number) => {
        productCount = count;
        this.updateProductCount(productId, productCount);
      },
      error => {
        console.error('Error changing count in cart:', error);
      }
    );
  }

  getItemByCartId(productId: number) {
    return this.cart.find(item => item.product.id === productId);
  }

  updateProductCount(productId: number, count: number) {
    const cartItem = this.getItemByCartId(productId);
    if (cartItem) {
      cartItem.count = count;
    }
  }

  deleteFromCart(id: number) {
    this.cartService.deleteFromCart(id).subscribe(
      response => {
        // No need to assign cartService.cart to this.cart
      },
      error => {
        console.log(error);
      }
    );
  }

  isMinusButtonDisabled(count:number){
    if(count > 1){
      return false
    } else {
      return true
    }
  }

  sendOrder() {
    this.cartService.sendOrder(this.cart, this.totalPrice, this.currency).subscribe(
      response => {
        console.log('Order issued:', response);
      },
      error => {
        console.log('Error submitting order:', error);
      }
    );
  }
}
