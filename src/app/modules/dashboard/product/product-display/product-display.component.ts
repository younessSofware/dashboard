import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
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

  chart: Chart;
  salesChartLoading = true;
  salesChartError: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private translateService: TranslateService) { }

  async ngOnInit() {
    this.chart = {
      name: await firstValueFrom(this.translateService.get('sales')),
      title: 'product_sales_last_month',
      type: 'line',
      categories: this.monthBefore(),
      values: []
    }
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
        this.getProductSales()
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

  getProductSales(){
    this.salesChartLoading = true;
    this.productService.sales(this.productId).subscribe({
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


        this.salesChartLoading = false;
      },
      error: err => {
        console.log(err);
        this.salesChartError = err;
        this.salesChartLoading = false;
      }
    })
  }

  photo(photo: string){
    return DOMAIN_URL + "\\" +  photo
  }
}
