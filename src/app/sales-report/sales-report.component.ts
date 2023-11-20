import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { Product } from 'src/shared/models/Product.model';
import { Router } from '@angular/router';
/* import { ChartDataset, ChartType, ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
 */
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  @ViewChild('barChart')
  barChart!: ElementRef;
  chart: any;
  productList: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProducts().subscribe(products => {
      this.productList = products;
      //this.generateBarChart();
    });

    
  }

  columnChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Product Quantity Chart'
    },
    xAxis: {
      categories: ['Cutting Board', 'Toilet Paper', 'Shampoo','Whipped Cream','Orange Juice','Sea Salt Popcorn','Organic baby carrots','Ceramic Bowls(Set of 3)','Brown Bread','Organic Red Apples','Toothpaste']
    },
    yAxis: {
      title: {
        text: 'Stock Quantity'
      },
      categories: [],
      min: 0,
      max: 80,
      tickInterval: 5
    } as any,
    series: [{
      name: 'In stock',
      data: [19,40,49,22,30,70,20,20,39,49,30]
    }] as any
  });

  // generateBarChart(): void {
  //   const labels: string[] = [];
  //   const data: number[] = [];

  //   this.productList.forEach(product => {
  //     labels.push(product.name);
  //     data.push(product.stockQty);
  //   });

  //   const chartConfig: ChartConfiguration<'bar', number[], string> = {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: 'Stock Quantity',
  //         data: data,
  //         backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //         borderColor: 'rgba(54, 162, 235, 1)',
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       legend: {
  //         display: false
  //       },
  //       scales: {
  //         legend: {
  //           display: false
  //         },
  //         scales: {
  //           xAxes: [
  //             {
  //               ticks: {
  //                 display: true
  //               }
  //             }
  //           ],
  //           yAxes: [
  //             {
  //               ticks: {
  //                 display: true
  //               }
  //             }

  //           ]
  //         }
  //       }
  //     },

  //     this.chart  = new Chart(this.barChart.nativeElement, chartConfig);
  //   }
  // }

}
