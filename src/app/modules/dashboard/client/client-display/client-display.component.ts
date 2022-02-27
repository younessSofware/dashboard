import { OrderState } from './../../../../common/models/enums/order-state';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './../../../../services/dashboard.service';
import { ChartOptions } from 'src/app/common/models/chart-options';
import { DOMAIN_URL } from './../../../../common/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

  maxOrders = 0;
  ordersLoading = true;
  storeSellsLoading = true;

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
    grid: {
      row: {
        colors: ["transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    xaxis: {
      categories: this.monthBefore()
    }
  };

  clientId: number;
  client: any;
  products: any[];
  deliveryMen: any[];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) { }

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
        if(id) this.clientId = +id
        this.getStore();
        this.getProducts();
        this.getDeliveryMen();
        this.getOrdersStatistics();
        this.grtStoreSells()
      }
    )
  }

  getStore(){
    this.dashboardService.getClient(this.clientId)
    .subscribe({
      next: (resp: any) => {
        this.client = resp.data;
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getProducts(){
    this.dashboardService.getStoreProducts(this.clientId, {limit: 8})
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
    this.dashboardService.getStoreDeliveryMen(this.clientId, {limit: 8})
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
    this.dashboardService.orderStatistics(this.clientId)
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
    this.dashboardService.grtStoreSells(this.clientId)
    .subscribe({
      next: (resp: any) => {
        console.log("store sells resp", resp);

        this.storeSellsChartOptions.series[0].data = this.monthBefore().map(e => 0)


        resp.data.map((s: any) => {
          const ind = new Date().getDate() - new Date(s.createdAt).getDate()
          this.storeSellsChartOptions.series[0].data[31 - ind] += s.amount
        })

        console.log(this.storeSellsChartOptions.series[0].data );
        setTimeout(() => {
          this.storeSellsLoading = false
        }, 100);
      },
      error: err => {
        this.ordersLoading = false
        console.log("store sells err", err);
      }
    })
  }

  productPhoto(product: any){
    return DOMAIN_URL + "" + product.photo
  }

}
