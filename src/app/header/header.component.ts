import { Component, HostListener } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  constructor(public cartService:CartService){

  }
  isScrolled: boolean = false;
  count: number = 0

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.pageYOffset > 0;
  }
  
  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.count = cartItems.length;
    });
    this.cartService.getCart().subscribe(); 
  }
}
