import { ChartOptions } from 'src/app/common/models/chart-options';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-radial-bar',
  templateUrl: './radial-bar.component.html',
  styleUrls: ['./radial-bar.component.scss']
})
export class RadialBarComponent implements OnInit, OnChanges {

  chart: Partial<ChartOptions> | any;
  @Input() labels: string[];
  @Input() colors: string[];
  @Input() max: number | undefined = undefined;
  @Input() values: any[];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.labels && this.colors && this.max != undefined){
      this.chart = {
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
        colors: this.colors,
        labels: this.labels,
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
            return  ' - ' + seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] * (this.max ? this.max : 1) / 100;
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
      }
    }
    if(changes['values'] && this.values && this.values.length){
      this.chart.series = this.values;
    }
  }

}
