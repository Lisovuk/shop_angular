import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'http://localhost:3000/products';
  public currency: string = '₴'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  addComment(commentator: string, comment: string, id: number) {
    const newComment = { commentator, comment };
    return this.http.post<any>(`http://localhost:3000/product/${id}/addComments`, newComment);
  }

  filterProducts(key: string) {
    if (key != '') {
      return this.http.get<any[]>(`http://localhost:3000/productsFilter/${key}`);
    } else { 
      return this.getProducts() 
    }
  }

}


export interface Product {
  id: number;
  name: string;
  price: number;
  size: number;
  description: string;
  season: string;
  material: string;
  color: string;
  imageURL: string;
  comments: [
    comment: {
      commentator: string;
      comment: string;
    }
  ]
}
