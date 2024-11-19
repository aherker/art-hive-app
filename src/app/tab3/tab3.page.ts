import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GlobalService } from 'src/app/services/global.service';
import * as XLSX from 'xlsx';    // Import XLSX from xlsx
import { saveAs } from 'file-saver';   // Import saveAs from file-saver
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
//import { DApagePage } from 'src/app/pages/dapage/dapage.page'; /// added for etc and discovery methods


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

   constructor(private firestoreService: FirestoreService, private globalService: GlobalService) {}//,private daPage: DApagePage



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
  
  // // Helper method to check if a value is a FormArray
  isFormArray(value: any): boolean {
    return value instanceof FormArray;
  }

async exportAllUserDataToExcel() {
  try {
    // Static mapping of question numbers to prompts, prefixed with "Question #"
    const questionPrompts: { [key: string]: string } = {
      1: "Name of the people who are completing this form (Members of the community, if they agree to have their names written here):",
      2: "Starting and ending date of the art hive:",
      3: "Address:",
      4: "Contact(s):",
      5: "Partners for this Art Hive - individuals, programs, projects, or organizations:",
      6: "List facilitator names:",
      7: "Number of participants (include facilitators):",
      8: "Approximate number of older adults >= 65:",
      9: "Approximate numbers of students (label with educational institutions):",
      10: "Approximate number of children:",
      11: "Number of new participants:",
      12: "How did new participants find the event?",
      13: "Were there any discussions related to EDI topics?",
      14: "If self-identification occurred, what may have facilitated it?",
      15: "If needed, was a common ground found? If so, how?",
      16: "What could be done to reach out for under-represented perspectives?",
      17: "List action steps to reach out for under-represented perspectives. How and when?",
      18: "Forms of expression:",
      19: "Themes & symbols:",
      20: "Art materials or instruments used:",
      21: "Expressive Therapies Continuum (ETC):",
      22: "Discussion Theme: related to community",
      23: "Discussion themes: related to artmaking",
      24: "Discussion themes: self-care and personal successes",
      25: "Discussion themes: challenges",
      26: "Discussion themes: other",
      27: "Highlights: holding the physical/digital space",
      28: "Highlights: community experience",
      29: "Highlights: accessible, third-space studio environment",
      30: "Highlights: participants' leadership",
      31: "Highlights: boundaries",
      32: "Highlights: other",
      33: "Challenges: holding the physical/digital space",
      34: "Challenges: community experience",
      35: "Challenges: artmaking",
      36: "Challenges: accessible, third-space studio environment",
      37: "Challenges: participants' leadership",
      38: "Challenges: boundaries",
      39: "Challenges: other",
      40: "Circles of Care connections:",
      41: "Testimonies - direct quotes from individuals:",
      42: "Proposed themes/interests from participants",
      43: "Action items required and who will follow up",
      44: "Potential research questions",
    };

    // Fetch all user form responses
    const responses = await this.firestoreService.getDocuments(this.globalService.getUserId());

    if (!responses || responses.length === 0) {
      console.error("No responses found for this user.");
      return;
    }

    // Prepare the header row dynamically based on the static question prompts
    const headerRow: { [key: string]: string } = { Timestamp: "Timestamp" }; // First column is Timestamp
    Object.keys(questionPrompts).forEach((key) => {
      headerRow[`Question ${key}`] = `Question ${key}: ${questionPrompts[key]}`;
    });

    // Prepare the data rows
    const dataRows = responses.map((response) => {
      const row: { [key: string]: string } = {};
      row["Timestamp"] = response["timestamp"]?.toDate().toLocaleString() || "N/A";

      Object.keys(questionPrompts).forEach((key) => {
        const questionIndex = parseInt(key, 10) - 1;
        const keysGroup = this.orderedKeys[questionIndex];
        const combinedAnswers = keysGroup
          .slice(1) // Skip the question prompt key
          .map((subKey) => {
            if (subKey === "selectedETC") {
              return this.processETCData(response[subKey]);
            } else if (subKey === "discoveryMethods") {
              return this.processDiscoveryMethodsData(response[subKey], response["otherDiscovery"]);
            } else if (this.isArray(response[subKey])) {
              const subKeys = this.getOrderedSubKeys(subKey);
              return response[subKey]
                .map((item: any) =>
                  subKeys.map((subField) => `${item[subField] || ""}`).join(", ")
                )
                .join(" | ");
            } else {
              return response[subKey] || "";
            }
          })
          .filter((answer) => answer)
          .join(", ");

        row[`Question ${key}`] = combinedAnswers || "N/A";
      });

      return row;
    });

    // Combine the header row and data rows
    const allRows = [headerRow, ...dataRows];

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(allRows, { skipHeader: true });

    // Auto-fit column widths
    const columnWidths = Object.keys(headerRow).map((key) => {
      const maxLength = Math.max(
        ...allRows.map((row) => (row[key] ? row[key].toString().length : 0)),
        key.length
      );
      return { wch: maxLength + 2 };
    });

    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `User_Data_${new Date().toISOString()}.xlsx`);

    console.log("Excel file generated and downloaded successfully.");
  } catch (error) {
    console.error("Error exporting user data to Excel:", error);
  }
}

// Helper function to process ETC data
private processETCData(selectedETC: string[]): string {
  if (!Array.isArray(selectedETC)) {
    return "N/A";
  }

  const etcLabels = [
    { value: "kinesthetic", label: "Kinesthetic" },
    { value: "sensory", label: "Sensory" },
    { value: "perceptual", label: "Perceptual" },
    { value: "affective", label: "Affective" },
    { value: "cognitive", label: "Cognitive" },
    { value: "symbolic", label: "Symbolic" },
    { value: "creative", label: "Creative" },
  ];

  // Map selectedETC values to their labels
  return etcLabels
    .filter((etc, index) => selectedETC[index]) // Match selected options
    .map((etc) => etc.label)
    .join(", ");
}

// Helper function to process Discovery Methods data
private processDiscoveryMethodsData(selectedMethods: string[], otherDiscovery: string): string {
  if (!Array.isArray(selectedMethods)) {
    return "N/A";
  }

  const discoveryLabels = [
    { value: "Word of mouth", label: "Word of Mouth" },
    { value: "Passing by", label: "Passing By" },
    { value: "Social media", label: "Social Media" },
  ];

  const selectedLabels = discoveryLabels
    .filter((method, index) => selectedMethods[index]) // Match selected options
    .map((method) => method.label);

  if (otherDiscovery && otherDiscovery.trim() !== "") {
    selectedLabels.push(`Other: ${otherDiscovery.trim()}`);
  }

  return selectedLabels.join(", ");
}

}




