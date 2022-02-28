import { ChartOptions } from 'src/app/common/models/chart-options';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() categories: string[];
  @Input() title: string;
  @Input() dataName: string;
  @Input() values: number[];

  chart: Partial<ChartOptions> | any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.categories && this.title && this.dataName){
      this.chart = {
        series: [
          {
            name: this.dataName,
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
          text: this.title,
          align: "left"
        },
        xaxis: {
          categories: this.categories
        }
      };
    }
    if(changes['values'] && this.values && this.values.length){
      this.chart.series[0].data = this.values;
    }
  }

}
