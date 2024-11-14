import { Component, ChangeDetectorRef, OnInit, ViewChild, ElementRef, viewChild } from '@angular/core';
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
  @ViewChild('discoveryDoughnutCanvas') discoveryDoughnutCanvas!: ElementRef;
  @ViewChild('etcDoughnutCanvas') etcDoughnutCanvas!: ElementRef;

  attendanceDemographicChart: any;
  previousAttendanceChart: any;
  discoveryChart: any;
  etcChart: any;

  //AttendanceDemographic
  totalChildren: number = 0;
  totalSeniors: number = 0;
  totalStudents: number = 0;

  //New vs Recurring Attendance
  numAttendance: number = 0;
  recurringAttendance: number = 0;
  newAttendance: number = 0;

  //Discovery Methods
  discoveryOtherCount: number = 0;
  discoveryPassingByCount: number = 0;
  discoveryWordOfMouthCount: number = 0;
  discoverySocialMediaCount: number = 0; 

  //ETC
  kinestheticCount: number = 0;
  sensoryCount: number = 0;
  perceptualCount: number = 0;
  affectiveCount: number = 0;
  cognitiveCount: number = 0;
  symbolicCount: number = 0;
  creativeCount: number = 0;

  isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(private firestoreService: FirestoreService, private globalService: GlobalService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {

  }

  ionViewWillEnter(){
    this.resetCounts(); // Clear previous data to avoid duplication
    

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.isDarkMode = e.matches;
      this.initializeAttendanceDemographicsChart();
      this.initializePreviousAttendanceChart();
      this.initializeDiscoveryChart();
      this.initializeEtcChart();
      this.updateChartColors();
      this.cdr.detectChanges(); // Trigger change detection to re-render the chart with new colors
    });
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

    try{
      const data = await this.firestoreService.getDocuments(this.globalService.getUserId());

      data.forEach((dataForm: any) => {

        if (dataForm.otherDiscovery && dataForm.otherDiscovery.trim() !== '') {
          this.discoveryOtherCount += 1;
        }

        if (Array.isArray(dataForm.discoveryMethods)) {
          dataForm.discoveryMethods.forEach((isSelected: boolean, index: number) => {
            if (isSelected) {
              // Increment respective counters based on index
              switch (index) {
                case 0:
                  this.discoveryWordOfMouthCount += 1;
                  break;
                case 1:
                  this.discoveryPassingByCount += 1;
                  break;
                case 2:
                  this.discoverySocialMediaCount += 1;
                  break;
              }
            }
          });
        }
      });

      this.initializeDiscoveryChart();

      console.log(`Word of mouth: ${this.discoveryWordOfMouthCount} Passing by: ${this.discoveryPassingByCount} SocialMedia: ${this.discoverySocialMediaCount}, otherDiscovery: ${this.discoveryOtherCount}`);
    }catch(error){
      console.error('failed to fetch discovery chart data', error);
    }

    try{
      const data = await this.firestoreService.getDocuments(this.globalService.getUserId());

      data.forEach((dataForm: any) => {
        if (Array.isArray(dataForm.selectedETC)) {
          dataForm.selectedETC.forEach((isSelected: boolean, index: number) => {
            if (isSelected) {
              // Increment respective counters based on index
              switch (index) {
                case 0:
                  this.kinestheticCount += 1;
                  break;
                case 1:
                  this.sensoryCount += 1;
                  break;
                case 2:
                  this.perceptualCount += 1;
                  break;
                case 3:
                  this.affectiveCount += 1;
                  break;
                case 4:
                  this.cognitiveCount += 1;
                  break;
                case 5:
                  this.symbolicCount += 1;
                  break;
                case 6:
                  this.creativeCount += 1;
                  break;  
              }
            }
          });
        }
      });

      this.initializeEtcChart();

      console.log(`kinestheticCount: ${this.kinestheticCount}, sensoryCount: ${this.sensoryCount}, perceptualCount: ${this.perceptualCount}, affectiveCount: ${this.affectiveCount}, cognitiveCount: ${this.cognitiveCount}, symbolicCount: ${this.symbolicCount}, creativeCount: ${this.creativeCount}`)
    }catch(error){
      console.error('failed to fetch ETC chart data', error);
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
          legend: {
            labels: {
              color: this.isDarkMode ? '#FFFFFF' : '#000000',
            }
          },
          title: {
            display: true,
            text: 'Attendance Demographics',
            align: 'center',
            color: this.isDarkMode ? '#FFFFFF' : '#000000',
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
          legend: {
            labels: {
              color: this.isDarkMode ? '#FFFFFF' : '#000000',
            }
          },
          title: {
            display: true,
            text: 'New vs Recurring Attendance',
            align: 'center',
            color: this.isDarkMode ? '#FFFFFF' : '#000000',
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

  initializeDiscoveryChart() {
    if (this.discoveryChart) {
      this.discoveryChart.destroy(); // Clear previous chart instance to prevent duplication
    }

    this.discoveryChart = new Chart(this.discoveryDoughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Word of mouth', 'Passing by', 'Social media', 'other'],
        datasets: [{
          data: [this.discoveryWordOfMouthCount, this.discoveryPassingByCount, this.discoverySocialMediaCount, this.discoveryOtherCount],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: this.isDarkMode ? '#FFFFFF' : '#000000',
            }
          },
          title: {
            display: true,
            text: 'Discovery',
            align: 'center',
            color: this.isDarkMode ? '#FFFFFF' : '#000000',
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

  initializeEtcChart() {
    if (this.etcChart) {
      this.etcChart.destroy(); // Clear previous chart instance to prevent duplication
    }

    this.etcChart = new Chart(this.etcDoughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Kinesthetic', 'Sensory', 'Perceptual', 'Affective', 'Cognitive', 'Symbolic', 'Creative'],
        datasets: [{
          data: [this.kinestheticCount, this.sensoryCount, this.perceptualCount, this.affectiveCount, this.cognitiveCount, this.symbolicCount, this.creativeCount],
          backgroundColor: [
            '#FF6384', // Kinesthetic - Red-Pink
            '#36A2EB', // Sensory - Blue
            '#FFCE56', // Perceptual - Yellow
            '#4BC0C0', // Affective - Greenish-Blue
            '#9966FF', // Cognitive - Purple
            '#FF9F40', // Symbolic - Orange
            '#8DFF57'  // Creative - Bright Green
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: this.isDarkMode ? '#FFFFFF' : '#000000',
            }
          },
          title: {
            display: true,
            text: 'Expressive Therapies Continuum (ETC)',
            align: 'center',
            color: this.isDarkMode ? '#FFFFFF' : '#000000',
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

  updateChartColors() {
    if (this.attendanceDemographicChart) {
      this.attendanceDemographicChart.options.plugins.legend.labels.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.attendanceDemographicChart.options.plugins.title.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.previousAttendanceChart.options.plugins.legend.labels.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.previousAttendanceChart.options.plugins.title.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.discoveryChart.options.plugins.legend.labels.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.discoveryChart.options.plugins.title.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.etcChart.options.plugins.legend.labels.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.etcChart.options.plugins.title.color = this.isDarkMode ? '#FFFFFF' : '#000000';
      this.discoveryChart.update();
      this.etcChart.update();
      this.previousAttendanceChart.update();
      this.attendanceDemographicChart.update();
    }
  }

  private resetCounts(){
    //AttendanceDemographic
    this.totalChildren = 0;
    this.totalSeniors = 0;
    this.totalStudents = 0;

    //New vs Recurring Attendance
    this.numAttendance = 0;
    this.recurringAttendance = 0;
    this.newAttendance = 0;

    //Discovery Methods
    this.discoveryOtherCount = 0;
    this.discoveryPassingByCount = 0;
    this.discoveryWordOfMouthCount = 0;
    this.discoverySocialMediaCount = 0;

    //ETC
    this.kinestheticCount = 0;
    this.sensoryCount = 0;
    this.perceptualCount = 0;
    this.affectiveCount = 0;
    this.cognitiveCount = 0;
    this.symbolicCount = 0;
    this.creativeCount = 0;
  }
}

