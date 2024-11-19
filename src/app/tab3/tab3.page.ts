import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GlobalService } from 'src/app/services/global.service';
import * as XLSX from 'xlsx';    // Import XLSX from xlsx
import { saveAs } from 'file-saver';   // Import saveAs from file-saver
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  isAdmin$!: Promise<boolean>;
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

    this.isAdmin$ = this.firestoreService.getAdminStatus();
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
      if(await this.isAdmin$){
        const responses = await this.firestoreService.getDocuments('allForms');
        this.formResponses = responses;  // Store the fetched data
      }else{
        const responses = await this.firestoreService.getDocuments(this.globalService.getUserId());
        this.formResponses = responses;  // Store the fetched data
      }
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
  
  // // Helper method to check if a value is a FormArray
  isFormArray(value: any): boolean {
    return value instanceof FormArray;
  }


prepareExcelData() {
  const headers = ['Timestamp', ...this.orderedKeys.map((_, index) => `Question ${index + 1}`)];

  const rows = this.formResponses.map(response => {
      const timestamp = response.timestamp ? response.timestamp.toDate().toLocaleString() : 'No timestamp';

      const rowData = this.orderedKeys.map((questionGroup) => {
          return questionGroup.map(key => {
              const answer = response[key] || 'No answer';

              if (Array.isArray(answer.controls) && this.keyOrderMapping[key]) {
                  return answer.controls.map((controlGroup: FormGroup) => {
                      // Isolate formatting specifically for Questions 4, 9, 18, and 20 based on how data is stored
                      switch (key) {
                          case 'contactList':
                              // Format Question 4: "Name: <name>, Email: <email>, Phone number: <phone>"
                              const contactName = controlGroup.get('contactName')?.value || 'No name';
                              const contactEmail = controlGroup.get('contactEmail')?.value || 'No email';
                              const contactPhone = controlGroup.get('contactPhone')?.value || 'No phone';
                              return `Name: ${contactName}, Email: ${contactEmail}, Phone number: ${contactPhone}`;

                          case 'numStudentsList':
                              // Format Question 9: "Educational Institution: <institution>, Number of students: <numStudents>"
                              const eduInstitution = controlGroup.get('eduInstitution')?.value || 'No institution';
                              const numStudents = controlGroup.get('numStudents')?.value || 'No number';
                              return `Educational Institution: ${eduInstitution}, Number of students: ${numStudents}`;

                          case 'formsOfExpressionsList':
                              // Format Question 18: "Number of art form: <numExpression>, Form of art: <formType>"
                              const numExpression = controlGroup.get('numOfExpression')?.value || 'No number';
                              const formType = controlGroup.get('formsOfExpressionType')?.value || 'No form';
                              return `Number of art form: ${numExpression}, Form of art: ${formType}`;

                          case 'materialsUsedList':
                              // Format Question 20: "Number of materials or instruments used: <numMaterials>, Materials or instruments used: <materialsType>"
                              const numMaterials = controlGroup.get('numMaterialsUsed')?.value || 'No number';
                              const materialsType = controlGroup.get('materialsUsedType')?.value || 'No materials';
                              return `Number of materials or instruments used: ${numMaterials}, Materials or instruments used: ${materialsType}`;

                          default:
                              // Default formatting for other FormArray items without specific formatting requirements
                              return this.keyOrderMapping[key].map(endpointKey => {
                                  const value = controlGroup.get(endpointKey)?.value || 'No answer';
                                  return value;
                              }).join(', ');
                      }
                  }).join(' | ');
              } else if (Array.isArray(answer)) {
                  return answer.map(item => typeof item === 'object' && item !== null
                      ? Object.values(item).join(', ')
                      : item
                  ).join(', ');
              } else if (typeof answer === 'object' && answer !== null) {
                  return Object.values(answer).join(', ');
              }
              return answer;
          }).join(' | ');
      });

      return [timestamp, ...rowData];
  });

  return { headers, rows };
}


exportToExcel() {
  const { headers, rows } = this.prepareExcelData();

  // Create a worksheet and add headers and rows
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // Auto-size columns based on content length
  const colWidths = headers.map((_, colIndex) => {
      const columnContentLengths = [headers, ...rows].map(row => String(row[colIndex] || '').length);
      const maxLength = Math.max(...columnContentLengths) + 2; // Add padding for readability
      return { wch: maxLength }; // Width in characters to fit the content
  });
  worksheet['!cols'] = colWidths;  // Apply calculated column widths

  // Apply text wrapping in all cells
  Object.keys(worksheet).forEach(key => {
      if (key[0] !== '!') {
          worksheet[key].s = {
              ...worksheet[key].s,
              alignment: { wrapText: true },
          };
      }
  });

  // Create a new workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Form Responses");

  // Generate the Excel file as a Blob
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // Use FileSaver to prompt the user for a save location
  const timestamp = new Date().toISOString().replace(/[:\-]/g, '').replace(/\..+/, '');
  saveAs(blob, `FormResponses_${timestamp}.xlsx`);
}


}

