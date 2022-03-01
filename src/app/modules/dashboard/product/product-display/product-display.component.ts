import { Chart } from './../../../../common/models/Chart';
import { API_URL, DOMAIN_URL } from './../../../../common/constants';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {


  productLoading = true;
  productError: string;
  productId: number;
  product: any;

  chart: Chart = {
    name: 'Sells',
    title: 'Product Sells in last month',
    type: 'line',
    categories: this.monthBefore(),
    values: []
  }
  sellsChartLoading = true;
  sellsChartError: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDataId();
  }

  monthBefore () {
    const date = new Date()
    return [...new Array(31).keys()].map((e, ind) => {
      if(ind) date.setDate(date.getDate() - 1)
      return date.getDate() + ' ' + date.toString().slice(4, 7)
    })
  }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.productId = +id
        this.getProduct();
        this.getProductSells()
      }
    )
  }

  getProduct(){
    this.productLoading = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.product = resp.data
        this.productLoading = false;
      },
      error: err => {
        console.log(err);
        this.productLoading = false;
        this.productError = err;
      }
    })
  }

  getProductSells(){
    this.sellsChartLoading = true;
    this.productService.sells(this.productId).subscribe({
      next: (resp: any) => {
        console.log(resp);
        // this.product = resp.data
        this.chart.values = this.monthBefore().map(e => 0)

        resp.data.forEach((s: any) => {
          const ind = new Date().getDate() - new Date(s.createdAt).getDate()
          console.log(ind);

          this.chart.values[31 - ind] += s.quantity
        })

        console.log(this.chart.values);


        this.sellsChartLoading = false;
      },
      error: err => {
        console.log(err);
        this.sellsChartError = err;
        this.sellsChartLoading = false;
      }
    })
  }

  photo(photo: string){
    return DOMAIN_URL + "\\" +  photo
  }
}
