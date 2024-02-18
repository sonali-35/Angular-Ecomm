import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  addproduct(data: product) {
    return this.http.post('http://localhost:3000/Products', data)
  }

  productlist() {
    return this.http.get<product[]>('http://localhost:3000/Products')
  }

  deletrproduct(id: number) {
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }

  // update data

  getproduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/Products/${id}`)
  }

  updateproduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/Products/${product.id}`, product)
  }

  popularproduct() {
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=3')
  }
  trandyproduct() {
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=8')
  }

  // search product auto suggestion

  searchproduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/Products?q=${query}`)

  }
}


