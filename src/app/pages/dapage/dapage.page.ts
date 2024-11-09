import { Component, OnInit, ViewChild, ElementRef, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GlobalService } from 'src/app/services/global.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-dapage',
  templateUrl: './dapage.page.html',
  styleUrls: ['./dapage.page.scss'],
})
export class DApagePage implements OnInit, ViewWillEnter {

  @ViewChild('attendanceDemographicDoughnutCanvas') attendanceDemographicDoughnutCanvas!: ElementRef; // Reference to canvas
  @ViewChild('PreviousAttendanceDoughnutCanvas') PreviousAttendanceDoughnutCanvas!: ElementRef;
  attendanceDemographicChart: any;
  previousAttendanceChart: any;

  totalChildren: number = 0;
  totalSeniors: number = 0;
  totalStudents: number = 0;
  numAttendance: number = 0;
  recurringAttendance: number = 0;
  newAttendance: number = 0;

  constructor(private firestoreService: FirestoreService, private globalService: GlobalService) { }

  async ngOnInit() {
    ///await this.fetchChartData();
    //this.initializeAttendanceDemographicsChart();
  }

  ionViewWillEnter(){
    this.resetCounts(); // Clear previous data to avoid duplication
    this.fetchChartData();
  }

  async fetchChartData(){
    try {
      const data = await this.firestoreService.getDocuments(this.globalService.getUserId());

      data.forEach((dataForm: any) => {
        this.totalChildren += dataForm.numChildren || 0;
        this.totalSeniors += dataForm.numSeniors || 0;
        
        if (Array.isArray(dataForm.numStudentsList)) {
          dataForm.numStudentsList.forEach((studentObj: any) => {
            this.totalStudents += studentObj.numStudents || 0; 
          });
        }

        console.log(`Fetched Totals - Children: ${this.totalChildren}, Seniors: ${this.totalSeniors}, Students: ${this.totalStudents}`);
        console.log('Successfully fetched attendance demographic chart data');
      });

      this.initializeAttendanceDemographicsChart(); // Update chart after data is fetched
    } catch (error) {
      console.error('Failed to fetch attendance demographic chart data', error);
    }

    try{
      const data = await this.firestoreService.getDocuments(this.globalService.getUserId());

      data.forEach((dataForm: any) =>{
        this.numAttendance += dataForm.numParticipants || 0;
        this.newAttendance += dataForm.numNewParticipants || 0;
      });

      this.recurringAttendance = this.numAttendance - this.newAttendance;

      console.log(`Fetched Totals - totalAttendance: ${this.numAttendance}, newAttendance: ${this.newAttendance}, recurringAttendance: ${this.recurringAttendance}`);
      console.log('successfully fetched attendance chart data');

      this.initializePreviousAttendanceChart();
    }catch(error){
      console.error('failed to fetch attendance chart data', error);
    }
  }

  initializeAttendanceDemographicsChart() {
    if (this.attendanceDemographicChart) {
      this.attendanceDemographicChart.destroy(); // Clear previous chart instance to prevent duplication
    }

    this.attendanceDemographicChart = new Chart(this.attendanceDemographicDoughnutCanvas.nativeElement, {
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

  initializePreviousAttendanceChart() {
    if (this.previousAttendanceChart) {
      this.previousAttendanceChart.destroy(); // Clear previous chart instance to prevent duplication
    }

    this.previousAttendanceChart = new Chart(this.PreviousAttendanceDoughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Previous Attendees', 'New Attendees'],
        datasets: [{
          data: [this.recurringAttendance, this.newAttendance],
          backgroundColor: ['#FF6384', '#36A2EB'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'New vs Reccuring Attendance',
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

  private resetCounts(){
    this.totalChildren = 0;
    this.totalSeniors = 0;
    this.totalStudents = 0;
    this.numAttendance = 0;
    this.recurringAttendance = 0;
    this.newAttendance = 0;
  }
}

