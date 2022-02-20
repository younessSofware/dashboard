import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
