import { DOMAIN_URL } from './../../../../common/constants';
import { DashboardService } from './../../../../services/dashboard.service';
import { OrderState } from './../../../../common/models/enums/order-state';
import { Component, OnInit } from '@angular/core';

import { ChartOptions } from 'src/app/common/models/chart-options';
import { ActivatedRoute, Route } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {

  maxOrders = 0;
  ordersLoading = true;
  storeSellsLoading = true;
  storeOrdersLoading = true;
  storeOrdersCount = 0;
  showOrder = 0;

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

  storeSellsChartOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: 'sells',
        data: []
      }
    ],
    chart: {
      height: 380,
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
      text: "Store Sells in last month",
      align: "left"
    },
    xaxis: {
      categories: this.monthBefore()
    }
  };

  storeId: number;
  store: any;
  products: any[];
  deliveryMen: any[];
  orders: any[];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDataId();
  }

  monthBefore () {
    const date = new Date()
    return [...new Array(31).keys()].map((e, ind) => {
      if(ind) date.setDate(date.getDate() - 1)
      return date.getDate() + ' ' + date.toString().slice(4, 7)
    }).reverse()
  }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.storeId = +id
        this.getStore();
        this.getProducts();
        this.getDeliveryMen();
        this.getOrdersStatistics();
        this.grtStoreSells();
        this.getStoreOrders();
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

  getDeliveryMen(){
    this.dashboardService.getStoreDeliveryMen(this.storeId, {limit: 8})
    .subscribe({
      next: (resp: any) => {
        this.deliveryMen = resp.data.deliveryMen
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

        this.ordersChartOptions.series = statistics.map(v => v ? v * 100 / this.maxOrders : 0)

        this.ordersLoading = false
      },
      error: err => {
        this.ordersLoading = false
        console.log(err);
      }
    })
  }

  grtStoreSells(){
    this.storeSellsLoading = true
    this.dashboardService.grtStoreSells(this.storeId)
    .subscribe({
      next: (resp: any) => {
        console.log("store sells resp", resp);

        this.storeSellsChartOptions.series[0].data = this.monthBefore().map(e => 0)


        resp.data.map((s: any) => {
          const ind = new Date().getDate() - new Date(s.createdAt).getDate()
          this.storeSellsChartOptions.series[0].data[30 - ind]++
        })

        console.log(this.storeSellsChartOptions.series[0].data );

        this.storeSellsLoading = false
      },
      error: err => {
        this.ordersLoading = false
        console.log("store sells err", err);
      }
    })
  }

  getStoreOrders(){
    this.storeOrdersLoading = true
    this.dashboardService.grtStoreOrders(this.storeId, {skip: 0, take: 3})
    .subscribe({
      next: (resp: any) => {
        console.log("store orders resp", resp);
        this.storeOrdersCount = resp.data.count;
        this.orders = resp.data.orders
      },
      error: err => {
        this.storeOrdersLoading = false
        console.log("store orders err", err);
      }
    })
  }

  productPhoto(product: any){
    return DOMAIN_URL + "" + product.photo
  }
}
