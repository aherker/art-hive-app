import { Component, OnInit } from '@angular/core';
import Chart, {TitleOptions} from 'chart.js/auto';

@Component({
  selector: 'app-dapage',
  templateUrl: './dapage.page.html',
  styleUrls: ['./dapage.page.scss'],
})
export class DApagePage implements OnInit {
  doughnutChart: any;

  constructor() { }

  ngOnInit() {
    this.setupDoughnutChart();
  }

  setupDoughnutChart() {
    this.doughnutChart = new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['0-18', '19-30', '31-40', '41-50', '51-60', '60+'],
        datasets: [{
          label: 'age ranges',
          data: [4, 18, 12, 5, 2, 1],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: false,
            // text: 'Age Demographics',
            // color: '#333',
            // font: {
            //   size: 20,
            //   family: 'Arial'
            // }
          }
        }
      }
    });
  }
}
