import { DOMAIN_URL } from './../../../../common/constants';
import { DashboardService } from './../../../../services/dashboard.service';
import { OrderState } from './../../../../common/models/enums/order-state';
import { Component, OnInit } from '@angular/core';

import { ChartOptions } from 'src/app/common/models/chart-options';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {

  maxOrders = 0;
  ordersLoading = true;

  ordersChartOptions: Partial<ChartOptions> | any = {
    series: [],
    chart: {
      height: 390,
      type: "radialBar"
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
    labels: [OrderState.IN_PROGRESS, OrderState.IN_DELIVERY, OrderState.RECEIVED, OrderState.CANCELED],
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "left",
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: true
      },
      formatter: (seriesName: string, opts: any) => {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] * this.maxOrders / 100;
      },
      itemMargin: {
        horizontal: 3
      }
    },
    responsive: [
      {
        breakpoint: 48,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  };

  profitsChartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      lineCap: "round"
    },
    title: {
      text: "Product Trends by Month",
      align: "left"
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep"
      ]
    }
  };

  storeId: number;
  store: any;
  products: any[];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDataId();
  }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.storeId = +id
        this.getStore();
        this.getProducts();
        this.getOrdersStatistics();
      }
    )
  }

  getStore(){
    this.dashboardService.getStore(this.storeId)
    .subscribe({
      next: (resp: any) => {
        this.store = resp.data;
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getProducts(){
    this.dashboardService.getStoreProducts(this.storeId, {limit: 8})
    .subscribe({
      next: (resp: any) => {
        this.products = resp.data.products
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getOrdersStatistics(){
    this.ordersLoading = true
    this.dashboardService.orderStatistics(this.storeId)
    .subscribe({
      next: (resp: any) => {

        const statistics = [
          (resp.data['in progress']),
          (resp.data['in delivery']),
          (resp.data['received']),
          (resp.data['canceled'])
        ]
        this.maxOrders = Math.max(...statistics)

        this.ordersChartOptions.series = statistics.map(v => v * 100 / this.maxOrders)

    this.ordersLoading = false
      },
      error: err => {
        this.ordersLoading = false
        console.log(err);
      }
    })
  }

  productPhoto(product: any){
    return DOMAIN_URL + "" + product.photo
  }
}
