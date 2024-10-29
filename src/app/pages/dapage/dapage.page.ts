import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-dapage',
  templateUrl: './dapage.page.html',
  styleUrls: ['./dapage.page.scss'],
})
export class DApagePage implements OnInit {

  @ViewChild('attendanceDoughnutCanvas') attendanceDoughnutCanvas!: ElementRef; // Reference to canvas
  doughnutChart: any;

  totalChildren: number = 0;
  totalSeniors: number = 0;
  totalStudents: number = 0;

  constructor(private firestoreService: FirestoreService, private globalService: GlobalService) { }

  async ngOnInit() {
    await this.fetchChartData();
    this.initializeAttendanceChart();
  }

  async fetchChartData(){
    try{
      const data = await this.firestoreService.getDocuments(this.globalService.getUserId());

      data.forEach((dataForm: any) =>{
        this.totalChildren += dataForm.numChildren || 0;
        this.totalSeniors += dataForm.numSeniors || 0;
        
        if (Array.isArray(dataForm.numStudentsList)) {
          dataForm.numStudentsList.forEach((studentObj: any) => {
            this.totalStudents += studentObj.numStudents || 0; 
          });
        }

        console.log(`Fetched Totals - Children: ${this.totalChildren}, Seniors: ${this.totalSeniors}, Students: ${this.totalStudents}`);
        console.log('total num students:', this.totalStudents);
        console.log('Successfully fetched attendance chart data')
      });
    }catch(error){
      console.error('failed to fetch attendance chart data', error);
    }
  }

  initializeAttendanceChart() {
    this.doughnutChart = new Chart(this.attendanceDoughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Children', 'Seniors', 'Students'],
        datasets: [{
          data: [this.totalChildren, this.totalSeniors, this.totalStudents],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Attendance Demographics',
            align: 'center',
            font: {
              size: 20,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        },
        layout: {
          padding: {
            top: 20
          }
        }
      }
    });
  }
}
