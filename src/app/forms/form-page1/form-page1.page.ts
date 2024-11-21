import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {FirestoreService } from 'src/app/services/firestore.service';
import 'firebase/firestore';
import { deleteField , doc, updateDoc, getDoc } from 'firebase/firestore';
import { GlobalService } from 'src/app/services/global.service';
import { AlertController, ModalController, ViewWillEnter } from '@ionic/angular';
import { AddQuestionModalComponent } from 'src/app/forms/add-question-modal/add-question-modal.component';
import { db } from 'src/main';


@Component({
  selector: 'app-form-page1',
  templateUrl: './form-page1.page.html',
  styleUrls: ['./form-page1.page.scss']
})
export class FormPage1Page implements OnInit, ViewWillEnter{
  artHiveQuestionare!: FormGroup;
  isAdmin$!: Promise<boolean>;
  additionalQuestionsData: { [key: string]: string } = {};

  constructor(private formBuilder: FormBuilder, private firestoreService: FirestoreService, private globalService: GlobalService, private alertController: AlertController, private modalCtrl: ModalController, private cdr: ChangeDetectorRef) {}

  selectedETCOptions  = [
    { label: 'kinesthetic', value: 'kinesthetic' },
    { label: 'sensory', value: 'sensory' },
    { label: 'perceptual', value: 'perceptual' },
    { label: 'affective', value: 'affective' },
    { label: 'cognitive', value: 'cognitive' },
    { label: 'symbolic', value: 'symbolic' },
    { label: 'creative', value: 'creative' }

  ];

  discoveryMethodsOptions = [
    {label: 'Word of mouth' , value: 'Word of mouth' },
    { label: 'Passing by' , value: 'Passing by'},
    { label: 'Social media' , value: 'Social media' }
  ];

  ionViewWillEnter(){
    this.updateAdditionalQuestions();
  }

  ngOnInit() {
    this.isAdmin$ = this.firestoreService.getAdminStatus();

    this.artHiveQuestionare = this.formBuilder.group({

      question1: [' Name of the people who are completing this form (Members of the community, if they agree to have their names written here):'],
      membersName: this.formBuilder.array([]),

      question2: ['Starting and ending date of the art hive:'],
      startDateLabel: ['Start date:'],
      startDate: ['', Validators.required],
      endDateLabel: ['End date:'],
      endDate: ['', Validators.required],

      question3: ['Address:'],
      locationNameLabel: ['Name:'],
      locationName: ['', Validators.required],
      streetLabel: ['Street:'],
      street: ['', Validators.required],
      cityLabel: ['City:'],
      city: ['', Validators.required],
      stateLabel: ['State:'],
      state: ['', Validators.required],
      zipLabel: ['ZIP:'],
      zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],

      question4: ['Contact(s):'],
      contactList: this.formBuilder.array([]),

      question5: ['Partners for this Art Hive - individuals, programs, projects, or organizations:'],
      partnerList: this.formBuilder.array([]),

      question6: ['List facilitator names:'],
      facilitatorList: this.formBuilder.array([]),

      question7: ['Number of participants (include facilitators):'],
      numParticipants: ['', Validators.required],

      question8: ['Approximate number of older adults >= 65:'],
      numSeniors: ['', Validators.required],

      question9: ['Approximate numbers of students (label with educational institutions):'],
      numStudentsList: this.formBuilder.array([]),

      question10: ['Approximate number of children:'],
      numChildrenLabel: ['Number of children:'],
      numChildren: ['', Validators.required],

      question11: ['Number of new participants:'],
      numNewParticipantsLabel: ['Number of new participants:'],
      numNewParticipants: ['', Validators.required],

      question12: ['How did new participants find the event?'],
      discoveryMethods: this.formBuilder.array(this.discoveryMethodsOptions.map(() => this.formBuilder.control(false))), // Ensure at least one checkbox is selected,
      otherDiscoverylabel: ['If other, please specify:'],
      otherDiscovery: [''],

      question13: ['Were there any discussions related to EDI topics (age, gender, sexual orientation, ethnicity/race, disability, religion, neighborhood, etc.)?'],
      EDIQuestions: [''],

      question14: ['If self-identification occurred, what may have facilitated it?'],
      selfID: [''],

      question15: ['If needed, was a common ground found? If so, how (shared goals, community projects, etc.)?'],
      commonGround: [''],

      question16: ['What could be done to reach out for under-represented perspectives? (If any suggestions from the group)'],
      underRepresentedPerspectives: [''],

      question17: ['List action steps to reach out for under-represented perspectives. How and when? Who offered to reach out? (Name the team members or community members who offered to help, or organizations that were mentioned in the discussions for each action step):'],
      underRepresentedPerspectivesReachOut: [''],

      question18: ['Forms of expression (art, drama, poetry, music, baking, gardening, etc. - please indicate the approximate number of persons using these forms of expression, e.g., art (12), poetry (1), music (1), gardening (1)):'],
      formsOfExpressionsList: this.formBuilder.array([]),

      question19: ['Themes & symbols (please do not write techniques and art materials here):'],
      themesAndSymbols: [''],

      question20: ['Art materials or instruments used (please write the materials and the approximate number of persons using the same type of material (e.g., yarn (2), acrylic (5), collage (1), watercolor (1), guitar (1)):'],
      materialsUsedList: this.formBuilder.array([]),

      question21: ['Expressive Therapies Continuum (ETC):'],
      selectedETC: this.formBuilder.array(this.selectedETCOptions.map(() => this.formBuilder.control(false))), // Ensure at least one checkbox is selected

      question22: ['Discussion Theme: related to community'], 
      discussionCommunity: [''],

      question23: ['Discussion themes: related to artmaking'],
      discussionArtmaking: [''],

      question24: ['Discussion themes: self-care and personal successes'],
      discussionSelfCare: [''],

      question25: ['Discussion themes: challenges'],
      discussionChallenges: [''],

      question26: ['Discussion themes: other'],
      discussionOther: [''],

      question27: ['Highlights: holding the physical/digital space'],
      highlightsSpace: [''],

      question28: ['Highlights: community experience'],
      highlightsCommunity: [''],

      question29: ['Highlights: accessible, third-space studio environment'],
      highlightsEnvironment: [''],

      question30: ['Highlights: participants\' leadership (e.g., participants taking lead in explaining a technique to the group - or offering to do a skill share, or an idea about a community activity they want to start, participants being ambassadors for our activities, etc.)'],
      highlightsLeadership: [''],

      question31: ['Highlights: boundaries'],
      highlightsBoundaries: [''],

      question32: ['Highlights: other'],
      highlightsOther: [''],

      question33: ['Challenges: holding the physical/digital space'],
      challengesSpace: [''],

      question34: ['Challenges: community experience'],
      challengesCommunity: [''],

      question35: ['Challenges: artmaking'],
      challengesArtmaking: [''],

      question36: ['Challenges: accessible, third space studio environment'],
      challengesEnvironment: [''],

      question37: ['Challenges: participants\' leadership'],
      challengesLeadership: [''],

      question38: ['Challenges: boundaries'],
      challengesBoundaries: [''],

      question39: ['Challenges: other'],
      challengesOther: [''],

      question40: ['Circles of Care connections (e.g., friendships forming between participants, participant(s) sharing resources of self-care activities with the group, participants opening discussions about their circle of care, etc.)'],
      circleOfCare: [''],

      question41: ['Testimonies - direct quotes from individuals - please do not write down names'],
      testimonies: [''],

      question42: ['Proposed themes/interests from participants'],
      proposedThemes: [''],

      question43: ['Action items required and who will follow up'],
      actionItems: [''],

      question44: ['Potential research questions'],
      researchQuestions: [''],

      dynamicQuestions: this.formBuilder.array([]), // FormArray to hold additional questions

      timestamp: new Date()
    });

    this.updateAdditionalQuestions();
  }

  get membersName(): FormArray {
    return this.artHiveQuestionare.get('membersName') as FormArray;
  }

  get contactList(): FormArray {
    return this.artHiveQuestionare.get('contactList') as FormArray;
  }

  get partnerList(): FormArray {
    return this.artHiveQuestionare.get('partnerList') as FormArray;
  }

  get facilitatorList(): FormArray {
    return this.artHiveQuestionare.get('facilitatorList') as FormArray;
  }

  get numStudentsList(): FormArray{
    return this.artHiveQuestionare.get('numStudentsList') as FormArray;
  }

  get discoveryMethods() : FormArray{
    return this.artHiveQuestionare.get('discoveryMethods') as FormArray;
  }

  get formsOfExpressionsList(){
    return this.artHiveQuestionare.get('formsOfExpressionsList') as FormArray;
  }

  get materialsUsedList(){
    return this.artHiveQuestionare.get('materialsUsedList') as FormArray;
  }

  get selectedETC() {
    return (this.artHiveQuestionare.get('selectedETC') as FormArray);
  }

  get dynamicQuestions() : FormArray {
    return this.artHiveQuestionare.get('dynamicQuestions') as FormArray;
  }

  addMember() {
    this.membersName.push(
      this.formBuilder.group({
        membersNameLabel: ['Member\'s name:'],
        membersNameInput: ['', Validators.required]
      })
    );
  }

  removeMember(index: number) {
    this.membersName.removeAt(index);
  }

  addContact() {
    this.contactList.push(
      this.formBuilder.group({
        contactNameLabel: ['Name:'],
        contactName: ['', Validators.required],
        contactEmailLabel: ['Email:'],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhoneLabel: ['Phone number:'],
        contactPhone: ['', [Validators.required, Validators.pattern('^([0-9]{3})[-]?([0-9]{3})[-]?([0-9]{4})$')]]
      })
    );
  }

  removeContact(index: number) {
    this.contactList.removeAt(index);
  }

  addPartner() {
    this.partnerList.push(
      this.formBuilder.group({
        partnerNameLabel: ['Partner\'s name:'],
        partnerNameInput: ['', Validators.required]
      })
    );
  }

  removePartner(index: number) {
    this.partnerList.removeAt(index);
  }

  addFacilitator() {
    this.facilitatorList.push(
      this.formBuilder.group({
        facilitatorListLabel: ['Facilitator\'s name:'],
        facilitatorListInput: ['', Validators.required]
      })
    );
  }

  removeFacilitator(index: number) {
    this.facilitatorList.removeAt(index);
  }

  addInstitution() {
    this.numStudentsList.push(this.formBuilder.group({
      numStudentsLabel: ['Numbers of students:'],
      numStudents: ['', Validators.required],
      eduInstitutionLabel: ['Educational institution:'],
      eduInstitution: ['', Validators.required],
    }));
  }

  removeInstitution(index: number) {
    if (this.numStudentsList.length >= 1) {
      this.numStudentsList.removeAt(index);
    }
  }

  addExpression(){
    this.formsOfExpressionsList.push(this.formBuilder.group({
      formsOfExpressionsLabel: ['Form of art:'],
      formsOfExpressionType: ['', Validators.required],
      numOfExpressionLabel: ['Number of art form:'],
      numOfExpression: ['', Validators.required]
    }));
  }

  removeExpression(index: number){
    if (this.formsOfExpressionsList.length > 0) {
      this.formsOfExpressionsList.removeAt(index);
    }
  }

  addMaterialsUsed(){
    this.materialsUsedList.push(this.formBuilder.group({
      materialsUsedLabel: ['Materials or instruments used:'],
      materialsUsedType: ['', Validators.required],
      numMaterialsUsedLabel: ['Number materials or instruments used:'],
      numMaterialsUsed: ['', Validators.required]
    }));
  }

  removeMaterialsUsed(index: number){
    if (this.materialsUsedList.length >= 1) {
      this.materialsUsedList.removeAt(index);
    }
  }

  async onSubmit() {
    if (this.artHiveQuestionare.valid) {
      const formData = this.artHiveQuestionare.value;
  
      const selectedETCPreferences = formData.selectedETC
        .map((selected: boolean, index: number) => selected ? this.selectedETCOptions[index].value : null)
        .filter((value: any) => value !== null);  // Filter out null values (unchecked boxes)
  
      const discoveryMethodsPreferences = formData.discoveryMethods
        .map((selected: boolean, index: number) => selected ? this.discoveryMethodsOptions[index].value : null)
        .filter((value: any) => value !== null);  // Filter out null values (unchecked boxes)
  
      formData.discoveryMethods = discoveryMethodsPreferences;
      formData.selectedETC = selectedETCPreferences;
  
      try {
        // Call the FirestoreService to add the document
        await this.firestoreService.addDocument(this.globalService.getUserId(), formData);
        console.log('Form data saved successfully to user\'s collection');

        await this.firestoreService.addDocument('allForms', formData);
        console.log('Form data saved successfully to allForms collection');
        
        // Show submission success alert
        await this.showSubmissionAlert();
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    } else {
      console.error('Form is invalid');
    }
  }

  async showSubmissionAlert() {
    const alert = await this.alertController.create({
      header: 'Submission Successful',
      message: 'Your form has been submitted successfully!',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async showDeletionAlert() {
    const alert = await this.alertController.create({
      header: 'Question Successfully Deleted',
      message: 'The question has been successfully deleted from the form.',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async openAddQuestionModal() {
    const modal = await this.modalCtrl.create({
      component: AddQuestionModalComponent,
    });
  
    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.questionLabel) {
        // Wait for the dynamic question to be added before updating
        await this.addDynamicQuestion(result.data.questionLabel);
        
        // Fetch the updated questions and update the UI
        await this.updateAdditionalQuestions();
        
        // Trigger change detection to ensure UI reflects the changes
        this.cdr.detectChanges();
      }
    });
  
    await modal.present();
  }
  
  // async addDynamicQuestion(questionLabel: string) {
  //   try {
  //     // Fetch all documents from the 'AdditionalQuestions' collection
  //     const documents = await this.firestoreService.getDocuments('AdditionalQuestions');
  
  //     // Assuming there's only one document, get it
  //     const docRef = documents[0]; // Get the first document
  
  //     // Access the current questions directly since `data()` is unnecessary
  //     const currentQuestions = docRef || {}; // docRef contains raw data directly
  
  //     // Generate the new field name based on the current number of questions
  //     const newQuestionKey = `additionalQuestionLabel${Object.keys(currentQuestions).length + 1}`;

  //     // Add the new question label to the document fields
  //     await this.firestoreService.updateDocument('AdditionalQuestions', 'additionalQuestions', {
  //       [newQuestionKey]: questionLabel,
  //     });
  
  //     console.log('Form updated successfully with the new question');
  //   } catch (error) {
  //     console.error('Error saving new question to Firestore:', error);
  //   }
  // }  

  async addDynamicQuestion(questionLabel: string) {
    try {
      // Define the document ID and collection name
      const documentId = 'additionalQuestions'; // Known document ID
      const collectionName = 'AdditionalQuestions'; // Firestore collection name
  
      // Fetch the specific document
      const docRef = doc(db, collectionName, documentId);
  
      // Get the current document data
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const currentQuestions = docSnapshot.data() || {}; // Get existing questions
  
        // Generate the next available index by finding the next integer key (e.g., additionalQuestionLabel1)
        let newQuestionKey = `additionalQuestionLabel1`;
        let i = 1;
        while (currentQuestions[newQuestionKey]) {
          i++;
          newQuestionKey = `additionalQuestionLabel${i}`;
        }
  
        // Prepare the new question data to be added
        const newQuestionData = {
          [newQuestionKey]: questionLabel,
        };
  
        // Update the document by adding the new field
        await updateDoc(docRef, newQuestionData);
  
        console.log('Form updated successfully with the new question');
      } else {
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error saving new question to Firestore:', error);
    }
  }

  async updateAdditionalQuestions() {
    try {
      // Fetch documents from the 'AdditionalQuestions' collection
      const documents = await this.firestoreService.getDocuments('AdditionalQuestions');
      
      if (documents.length > 0) {
        const data = documents[0]; // Assuming only one document exists
        console.log('Fetched data:', data);
        
        // Store the fetched data
        this.additionalQuestionsData = data;
        
        // Clear the FormArray before repopulating
        const formArray = this.artHiveQuestionare.get('dynamicQuestions') as FormArray;
        formArray.clear();
  
        // Sort the keys numerically to ensure the questions are in the correct order
        const sortedKeys = Object.keys(data).sort((a, b) => {
          const numA = parseInt(a.replace('additionalQuestionLabel', ''), 10);
          const numB = parseInt(b.replace('additionalQuestionLabel', ''), 10);
          return numA - numB;
        });
  
        // Populate the FormArray in the sorted order
        sortedKeys.forEach((key) => {
          formArray.push(
            this.formBuilder.group({
              question: [data[key]], // Question label
              answer: [''],           // Answer control
            })
          );
        });
  
        // Trigger UI update after the form is updated
        this.cdr.detectChanges();
        console.log('Updated FormArray:', formArray.value);
      } else {
        console.log('No additionalQuestions document found.');
      }
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  }

async deleteQuestion(index: number) {
  try {
    const documentId = 'additionalQuestions'; // Known document ID
    const collectionName = 'AdditionalQuestions'; // Firestore collection name

    // Fetch the specific document reference
    const docRef = doc(db, collectionName, documentId);

    // Get the current document data
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const currentQuestions = docSnapshot.data() || {}; // Get existing questions

      // Get the keys of all current questions (ordered by their numeric suffix)
      const questionKeys = Object.keys(currentQuestions).sort((a, b) => {
        const numA = parseInt(a.replace('additionalQuestionLabel', ''), 10);
        const numB = parseInt(b.replace('additionalQuestionLabel', ''), 10);
        return numA - numB;
      });

      // Check if the index is within bounds
      if (index < 0 || index >= questionKeys.length) {
        console.log('Invalid index for deletion');
        return;
      }

      const questionKey = questionKeys[index]; // Get the key of the question to delete

      // Remove the question field from Firestore using deleteField()
      await updateDoc(docRef, {
        [questionKey]: deleteField(),
      });

      console.log(`Field '${questionKey}' successfully deleted from Firestore.`);

      // After deletion, update the form to reflect changes
      await this.updateAdditionalQuestions();

    } else {
      console.log('Document does not exist!');
    }
  } catch (error) {
    console.error('Error deleting question:', error);
  }
}

}
