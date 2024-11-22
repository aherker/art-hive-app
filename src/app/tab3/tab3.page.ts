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
  isGlobal: boolean = false;
  selectedItem: any;
  formResponses: any[] = []; 
  userId: string | null = null;
  selectedDocumentData: any;
  dynamicQuestions: Array<{ question: string; answer: string }> = [];

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

   constructor(private firestoreService: FirestoreService, private globalService: GlobalService) {}//,private daPage: DApagePage

  async ngOnInit() {
    this.isAdmin$ = this.firestoreService.getAdminStatus();

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

  // Getting documents
  async getFormResponses() {
    try {
      if(this.isGlobal){
        const responses = await this.firestoreService.getDocuments('allForms');
        this.formResponses = responses;  // Store the fetched data;
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
      this.dynamicQuestions = [];
      // Find the document matching the selected timestamp in formResponses
      this.selectedDocumentData = this.formResponses.find(doc =>
        doc['timestamp']?.toDate().getTime() === this.selectedItem.toDate().getTime()
      );

      if (this.selectedDocumentData?.dynamicQuestions) {
        this.dynamicQuestions = this.selectedDocumentData.dynamicQuestions;
      } else {
        console.warn('dynamicQuestions not found in the document');
      }
    
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

async exportAllUserDataToExcel() {
  try {
    // Fetch form responses
    //await this.getFormResponses();

    if (!this.formResponses || this.formResponses.length === 0) {
      console.warn('No form responses available to export.');
      return;
    }

    const excelData: any[][] = [];

    // Add headers with 'Timestamp' as the first column
    const headers: string[] = ['Timestamp'];

    // Add headers for static questions
    headers.push(
      ...this.orderedKeys.map((keyGroup: string[], questionIndex: number) => {
        const questionPrompt = this.formResponses[0][keyGroup[0]] || `Question ${questionIndex + 1}`;
        return `Question ${questionIndex + 1}: ${questionPrompt}`;
      })
    );

    // Aggregate all unique dynamic questions across submissions and assign numbers
    const dynamicQuestionsMap: { [key: string]: string } = {};
    this.formResponses.forEach((form) => {
      if (form.dynamicQuestions) {
        form.dynamicQuestions.forEach((dynamicQuestion: { question: string }) => {
          if (!dynamicQuestionsMap[dynamicQuestion.question]) {
            const questionNumber = Object.keys(dynamicQuestionsMap).length + this.orderedKeys.length + 1;
            dynamicQuestionsMap[dynamicQuestion.question] = `Question ${questionNumber}`;
          }
        });
      }
    });

    // Add headers for dynamic questions (just the numbers)
    headers.push(...Object.values(dynamicQuestionsMap));

    excelData.push(headers);

    // Populate rows with data
    this.formResponses.forEach((form) => {
      const row: string[] = [];

      // Add the timestamp
      const timestamp = form.timestamp
        ? form.timestamp.toDate().toLocaleString()
        : 'N/A';
      row.push(timestamp);

      // Add answers for static questions
      row.push(
        ...this.orderedKeys.map((keyGroup: string[]) => {
          let questionAnswer = ' ';
          keyGroup.forEach((key) => {
            if (key === 'selectedETC' && form[key]) {
              const etcData = form[key].join(' \n ');
              questionAnswer += `ETC: \n${etcData} \n `;
            } else if (key === 'discoveryMethods' && form[key]) {
              const methods = form[key].join(' \n ');
              questionAnswer += `Discovery Methods: \n${methods} \n `;
            } else if (key === 'otherDiscovery' && form[key]) {
              questionAnswer += `Other: \n${form[key]} \n `;
            } else if (Array.isArray(form[key])) {
              form[key].forEach((item: any) => {
                const subKeys = this.getOrderedSubKeys(key);
                subKeys.forEach((subKey) => {
                  if (item[subKey]) {
                    questionAnswer += `${item[subKey]} \n `;
                  }
                });
              });
            } else if (form[key] && key !== keyGroup[0]) {
              questionAnswer += `${form[key]} \n `;
            }
          });
          return questionAnswer.trim();
        })
      );

      // Add answers for dynamic questions (combine the prompt and answer in the cell)
      Object.keys(dynamicQuestionsMap).forEach((dynamicQuestion) => {
        const dynamicEntry = form.dynamicQuestions?.find(
          (dq: { question: string }) => dq.question === dynamicQuestion
        );

        // Combine the prompt and answer in the cell
        const dynamicCell = dynamicEntry
          ? `${dynamicEntry.question}: ${dynamicEntry.answer || 'N/A'}`
          : 'N/A'; // Fallback if the question is not present
        row.push(dynamicCell);
      });

      excelData.push(row);
    });

    // Create the worksheet and format the columns
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const columnWidths = headers.map((_, colIndex) => {
      const maxWidth = excelData.reduce((max, row) => {
        const cell = row[colIndex] || '';
        return Math.max(max, cell.toString().length);
      }, 10);
      return { width: maxWidth + 2 };
    });
    worksheet['!cols'] = columnWidths;

    // Create a workbook and save it
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Responses');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Form_Responses_${new Date().toISOString()}.xlsx`);

    console.log('Excel export successful.');
  } catch (error) {
    console.error('Error exporting data to Excel:', error);
  }
}

}




