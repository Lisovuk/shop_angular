import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, throwError, map, tap } from 'rxjs';
import { ProductsService, Product } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<{ product: Product, count: number }[]> = new BehaviorSubject<{ product: Product, count: number }[]>([]);
  public cart$: Observable<{ product: Product, count: number }[]> = this.cartSubject.asObservable();

  constructor(private http: HttpClient, private productsService: ProductsService) {
    this.getCart().subscribe(); // Fetch initial cart data
  }

  getCart(): Observable<{ product: Product; count: number; }[]> {
    const url = 'http://localhost:3000/cart';
    return this.http.get<{ product: Product; count: number; }[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching cart data:', error);
        return throwError(error);
      }),
      tap((response) => {
        this.cartSubject.next(response); // Update the cartSubject with the fetched data
      })
    );
  }

  addToCart(product: Product, count: number): void {
    const url = 'http://localhost:3000/addToCart';
    const requestBody = { product, count };

    this.http.post(url, requestBody).subscribe(
      () => {
        this.getCart().subscribe(); // Fetch updated cart data and update the cartSubject
      },
      error => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  countChange(productId: number, count: number, productCount: number): Observable<number> {
    const url = 'http://localhost:3000/changeCountInCart';
    const requestBody = { productId, count };
    return this.http.post<any>(url, requestBody).pipe(
      map(response => response.count),
      catchError(error => {
        console.error('Error changing count in cart:', error);
        return throwError(error);
      })
    );
  }

  deleteFromCart(id: number): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/cart/${id}`, {}).pipe(
      tap(response => {
        this.getCart().subscribe(); // Fetch updated cart data and update the cartSubject
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  sendOrder(cart: any, totalPrice: number, currency: string) {
    const order = {cart, totalPrice, currency}
    return this.http.post<any>('http://localhost:3000/order', order).pipe(
      tap(response => {
        this.getCart().subscribe();
      }),
      catchError(error => {
    console.log(1)

        // Handle any errors during the order submission
        console.log(error);
        return throwError(error);
      })
    );
  }
}
