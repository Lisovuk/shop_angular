import { Component, Input } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  currency: string = ''
  filterValue: string = ''

  constructor(public router: Router, public productsService: ProductsService) {
  }

  ngOnInit() {
    this.getProducts();
    this.currency = this.productsService.currency

  }
  getProducts() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        this.products = data;
        console.log(this.products);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });

  }

  goToProduct(productId: number) {
    console.log(productId);
    this.router.navigate(['/product', productId]);
  }
  
  filterProducts() {
    this.productsService.filterProducts(this.filterValue).subscribe(
      products => {
        this.products = products
      },
      error => {
        console.log(error);
      }
    );
  }

}