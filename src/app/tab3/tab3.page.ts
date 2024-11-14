import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GlobalService } from 'src/app/services/global.service';
import * as XLSX from 'xlsx';    // Import XLSX from xlsx
import { saveAs } from 'file-saver';   // Import saveAs from file-saver
import { FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  selectedItem: any;
  formResponses: any[] = []; 
  userId: string | null = null;
  selectedDocumentData: any;
  orderedKeys: (string | any)[][] = [
    ['question1', 'membersName'],  
    ['question2', 'startDateLabel', 'startDate', 'endDateLabel', 'endDate'],                 
    ['question3', 'locationNameLabel', 'locationName', 'streetLabel', 'street', 'cityLabel', 'city', 'stateLabel', 'state', 'zipLabel', 'zip'],
    ['question4', 'contactList'],
    ['question5', 'partnerList'],
    ['question6', 'facilitatorList'],
    ['question7', 'numParticipants'],
    ['question8', 'numSeniors'],
    ['question9', 'numStudentsList'],
    ['question10', 'numChildrenLabel', 'numChildren'],
    ['question11', 'numNewParticipantsLabel', 'numNewParticipants'],
    ['question12', 'discoveryMethods', 'otherDiscoverylabel', 'otherDiscovery'],
    ['question13', 'EDIQuestions'],
    ['question14', 'selfID'],
    ['question15', 'commonGround'],
    ['question16', 'underRepresentedPerspectives'],
    ['question17', 'underRepresentedPerspectivesReachOut'],
    ['question18', 'formsOfExpressionsList'],
    ['question19', 'themesAndSymbols'],
    ['question20', 'materialsUsedList'],
    ['question21', 'selectedETC'],
    ['question22', 'discussionCommunity'],
    ['question23', 'discussionArtmaking'],
    ['question24', 'discussionSelfCare'],
    ['question25', 'discussionChallenges'],
    ['question26', 'discussionOther'],
    ['question27', 'highlightsSpace'],
    ['question28', 'highlightsCommunity'],
    ['question29', 'highlightsEnvironment'],
    ['question30', 'highlightsLeadership'],
    ['question31', 'highlightsBoundaries'],
    ['question32', 'highlightsOther'],
    ['question33', 'challengesSpace'],
    ['question34', 'challengesCommunity'],
    ['question35', 'challengesArtmaking'],
    ['question36', 'challengesEnvironment'],
    ['question37', 'challengesLeadership'],
    ['question38', 'challengesBoundaries'],
    ['question39', 'challengesOther'],
    ['question40', 'circleOfCare'],
    ['question41', 'testimonies'],
    ['question42', 'proposedThemes'],
    ['question43', 'actionItems'],
    ['question44', 'researchQuestions']                               
  ];

  keyOrderMapping: { [key: string]: string[] } = {
    membersName: ['membersNameLabel', 'membersNameInput'],
    contactList: [ 'contactNameLabel', 'contactName', 'contactEmailLabel', 'contactEmail', 'contactPhoneLabel', 'contactPhone'],
    facilitatorList: ['facilitatorListLabel', 'facilitatorListInput'],
    formsOfExpressionsList: ['formsOfExpressionsLabel', 'formsOfExpressionType', 'numOfExpressionLabel', 'numOfExpression'],
    materialsUsedList: ['materialsUsedLabel', 'materialsUsedType', 'numMaterialsUsedLabel', 'numMaterialsUsed'],
    numStudentsList: ['eduInstitutionLabel', 'eduInstitution', 'numStudentsLabel', 'numStudents'],
    partnerList: ['partnerNameLabel', 'partnerNameInput']
  };
  
  getOrderedSubKeys(key: string): string[] {
    return this.keyOrderMapping[key] || [];
  }
  
  
  
  private userIdSubscription!: Subscription;

  constructor(private firestoreService: FirestoreService, private globalService: GlobalService) {}



  async ngOnInit() {
    this.userIdSubscription = this.globalService.userId$.subscribe(() => {
      this.getFormResponses();
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.userIdSubscription.unsubscribe();
  }

  sortFormResponses() {
    this.formResponses.sort((a, b) => {
      const timestampA = a.timestamp ? a.timestamp.toDate().getTime() : 0;
      const timestampB = b.timestamp ? b.timestamp.toDate().getTime() : 0;

      return timestampB - timestampA;  // Newest to oldest
    });
  }

  // Example of adding a document
  async addFormResponse() {
    const formData = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "Hello, Firestore!",
      timestamp: new Date()
    };

    await this.firestoreService.addDocument(this.globalService.getUserId(), formData);
  }

  // Example of getting documents
  async getFormResponses() {
    try {
      const responses = await this.firestoreService.getDocuments(this.globalService.getUserId());
      this.formResponses = responses;  // Store the fetched data

    } catch (error) {
      console.error('Error fetching form responses:', error);
    }

    this.sortFormResponses();
  }

  displaySelectedDocument() {
    if (this.selectedItem) {
      // Find the document matching the selected timestamp in formResponses
      this.selectedDocumentData = this.formResponses.find(doc =>
        doc['timestamp']?.toDate().getTime() === this.selectedItem.toDate().getTime()
      );
    } else {
      this.selectedDocumentData = null; // Clear selection if nothing is selected
    }
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  // Function to check if a value is an array
  isArray(value: any): boolean {
    return Array.isArray(value);
  }
  // Export to Excel //////////////////////////////////////////////////////////////////////////////////////////////////
  exportToExcel() {
    // Get headers and rows from prepareExcelData
    const { headers, rows } = this.prepareExcelData();
  
    // Create a worksheet with headers and rows
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  
    // Sets the column widths to auto-size 
    const colWidths = headers.map((_, colIndex) => {
      const maxLength = Math.max(
        ...[headers, ...rows].map(row => String(row[colIndex] || '').length)
      );
      return { wch: maxLength }; // Set column width to the max character length
    });
    
    worksheet['!cols'] = colWidths;  // Apply column widths
  
    // Applies text wrapping for all cells
    Object.keys(worksheet).forEach(key => {
      if (key[0] !== '!') {
        worksheet[key].s = {
          ...worksheet[key].s,
          alignment: { wrapText: true },
        };
      }
    });
  
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Form Responses");
  
    // Export the workbook as an Excel file
    XLSX.writeFile(workbook, "FormResponses.xlsx");
  }

  // prepareExcelData() {
  //   // Add "Timestamp" as the first header, followed by the question headers
  //   const headers = ['Timestamp', ...this.orderedKeys.map((_, index) => `Question ${index + 1}`)];
  
  //   // Create rows by mapping through each response
  //   const rows = this.formResponses.map(response => {
  //     const timestamp = response.timestamp ? response.timestamp.toDate().toLocaleString() : 'No timestamp';
      
  //     // Prepend the timestamp to each row, then add answers for each question group
  //     const rowData = this.orderedKeys.map((questionGroup) => {
  //       // Concatenate answers for each question in the group
  //       return questionGroup.map(key => response[key] || 'No answer').join(', ');
  //     });
  
  //     return [timestamp, ...rowData];
  //   });
  
  //   // Return headers and rows in a structured format
  //   return { headers, rows };
  // }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   saveAs(data, `${fileName}.xlsx`);
  // }
  prepareExcelData() {
    // Add "Timestamp" as the first header, followed by the question headers
    const headers = ['Timestamp', ...this.orderedKeys.map((_, index) => `Question ${index + 1}`)];
  
    // Create rows by mapping through each response
    const rows = this.formResponses.map(response => {
      const timestamp = response.timestamp ? response.timestamp.toDate().toLocaleString() : 'No timestamp';
  
      // Prepend the timestamp to each row, then add answers for each question group
      const rowData = this.orderedKeys.map((questionGroup) => {
        return questionGroup.map(key => {
          const answer = response[key] || 'No answer';
  
          // Check if the answer is a FormArray and handle it properly
          if (this.isFormArray(answer)) {
            // If it's a FormArray, extract its values and join them with a comma
            return answer.controls.map((control: FormControl) => control.value || '').join(', ');
          } else if (Array.isArray(answer)) {
            // If the answer is an array of objects, extract values from them
            return answer.map((item: any) => {
              // If the item is an object, extract its relevant fields as needed
              if (typeof item === 'object' && item !== null) {
                // Handle nested objects (like `numStudents` with `eduInstitution` and `numStudents` labels)
                return Object.values(item).join(' ');
              }
              return item;
            }).join(', ');
          } else if (typeof answer === 'object' && answer !== null) {
            // If it's an object (like FormControl), stringify it for readability
            return JSON.stringify(answer);
          }
  
          // Otherwise, return the answer as is (it should be a string, number, or null)
          return answer;
        }).join(', '); // Join answers for the group with a comma
      });
  
      return [timestamp, ...rowData];
    });
  
    // Return headers and rows in a structured format
    return { headers, rows };
  }
  
  // Helper method to check if a value is a FormArray
  isFormArray(value: any): boolean {
    return value instanceof FormArray;
  }



}


