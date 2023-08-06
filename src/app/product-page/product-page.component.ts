import { Component } from '@angular/core';
import { Product, ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  
  product: Product = {} as Product;
  currency:string = ''
  user: string = '123'
  comment: string = '123'
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    public router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
      });

      this.currency = this.productService.currency
      
    });
  }

  addToCart(product: any){
    this.cartService.addToCart(product, 1)    
  }

  goBack(){
    this.router.navigate(['/'])
  }
}








