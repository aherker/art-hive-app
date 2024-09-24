import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FirestoreService } from './firestore.service';

@Component({
  selector: 'app-form-page1',
  templateUrl: './form-page1.page.html',
  styleUrls: ['./form-page1.page.scss']
})

export class AppComponent {
  artHiveQuestionare: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService
  ) {
    this.artHiveQuestionare = this.formBuilder.group({
      membersName: this.formBuilder.array([]),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      locationName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      contactList: this.formBuilder.array([]),
      partnerList: this.formBuilder.array([]),
      facilitatorList: this.formBuilder.array([]),
      numParticipants: ['', Validators.required],
      numSeniors: ['', Validators.required],
      numStudentsList: this.formBuilder.array([]),
      numChildren: ['', Validators.required],
      numNewParticipants: ['', Validators.required],
      discoveryMethods: this.formBuilder.array([
        this.formBuilder.control(false), // Word of mouth
        this.formBuilder.control(false), // Passing by
        this.formBuilder.control(false), // Social media
      ]),
      otherDiscovery: [''],
      EDIQuestions: [''],
      // ...remaining fields
    });
  }

  getFormArrayValues(formArray: FormArray): any[] {
    return formArray.controls.map(control => control.value);
  }

  onSubmit() {
    if (this.artHiveQuestionare.valid) {
      // Process each form array to be stored as arrays in Firestore
      const formData = {
        ...this.artHiveQuestionare.value, // Non-array form fields

        // Convert FormArray values to arrays
        membersName: this.getFormArrayValues(this.artHiveQuestionare.get('membersName') as FormArray),
        contactList: this.getFormArrayValues(this.artHiveQuestionare.get('contactList') as FormArray),
        partnerList: this.getFormArrayValues(this.artHiveQuestionare.get('partnerList') as FormArray),
        facilitatorList: this.getFormArrayValues(this.artHiveQuestionare.get('facilitatorList') as FormArray),
        numStudentsList: this.getFormArrayValues(this.artHiveQuestionare.get('numStudentsList') as FormArray),
        formsOfExpressionsList: this.getFormArrayValues(this.artHiveQuestionare.get('formsOfExpressionsList') as FormArray),
        materialsUsedList: this.getFormArrayValues(this.artHiveQuestionare.get('materialsUsedList') as FormArray),

        // Process discoveryMethods array (which is an array of booleans)
        discoveryMethods: this.getFormArrayValues(this.artHiveQuestionare.get('discoveryMethods') as FormArray),
      };

      // Save processed data to Firestore
      this.firestoreService.addArtHiveQuestionnaire(formData)
        .then(() => {
          console.log('Form data successfully added to Firestore');
        })
        .catch(error => {
          console.error('Error adding form data to Firestore:', error);
        });
    } else {
      console.log('Form is not valid');
    }
  }
}
// export class FormPage1Page implements OnInit {
//   artHiveQuestionare!: FormGroup;
//   isOtherDiscoveryChecked: boolean = false;
//   etcLabels: string[] = ['kinesthetic', 'sensory', 'perceptual', 'affective', 'cognitive', 'symbolic', 'creative'];

//   constructor(private formBuilder: FormBuilder) {}

//   ngOnInit() {
//     this.artHiveQuestionare = this.formBuilder.group({
//       membersName: this.formBuilder.array([]),
//       startDate: ['', Validators.required],
//       endDate: ['', Validators.required],
//       locationName: ['', Validators.required],
//       street: ['', Validators.required],
//       city: ['', Validators.required],
//       state: ['', Validators.required],
//       zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
//       contactList: this.formBuilder.array([]),
//       partnerList: this.formBuilder.array([]),
//       facilitatorList: this.formBuilder.array([]),
//       numParticipants: ['', Validators.required],
//       numSeniors: ['', Validators.required],
//       numStudentsList: this.formBuilder.array([]),
//       numChildren: ['', Validators.required],
//       numNewParticipants: ['', Validators.required],
//       discoveryMethods: this.formBuilder.array([
//         this.formBuilder.control(false), // Word of mouth
//         this.formBuilder.control(false), // Passing by
//         this.formBuilder.control(false), // Social media
//       ]),
//       otherDiscovery: [''],
//       EDIQuestions: [''],
//       selfID: [''],
//       commonGround: [''],
//       underRepresentedPerspectives: [''],
//       underRepresentedPerspectivesReachOut: [''],
//       formsOfExpressionsList: this.formBuilder.array([]),
//       themsAndSymbols: [''],
//       materialsUsedList: this.formBuilder.array([]),
//       selectedETC: [''],
//       discussionCommunity: [''],
//       discussionArtmaking: [''],
//       discussionSelfCare: [''],
//       discussionChallenges: [''],
//       discussionOther: [''],
//       highlightsSpace: [''],
//       highlightsCommunity: [''],
//       highlightsEnvironment: [''],
//       highlightsLeadership: [''],
//       highlightsBoundaries: [''],
//       highlightsOther: [''],
//       challengesSpace: [''],
//       challengesCommunity: [''],
//       challengesArtmaking: [''],
//       challengesEnvironment: [''],
//       challengesLeadership: [''],
//       challengesBoundaries: [''],
//       challengesOther: [''],
//       circleOfCare: [''],
//       testimonies: [''],
//       proposedThemes: [''],
//       actionItems: [''],
//       researchQuestions: ['']

//     });
//   }

  // get membersName() {
  //   return this.artHiveQuestionare.get('membersName') as FormArray;
  // }

  // get contactList() {
  //   return this.artHiveQuestionare.get('contactList') as FormArray;
  // }

  // get partnerList() {
  //   return this.artHiveQuestionare.get('partnerList') as FormArray;
  // }

  // get facilitatorList() {
  //   return this.artHiveQuestionare.get('facilitatorList') as FormArray;
  // }

  // get numStudentsList(){
  //   return this.artHiveQuestionare.get('numStudentsList') as FormArray;
  // }

  // get discoveryMethods() : FormArray{
  //   return this.artHiveQuestionare.get('discoveryMethods') as FormArray;
  // }

  // get formsOfExpressionsList(){
  //   return this.artHiveQuestionare.get('formsOfExpressionsList') as FormArray;
  // }

  // get materialsUsedList(){
  //   return this.artHiveQuestionare.get('materialsUsedList') as FormArray;
  // }

  // get ETC() {
  //   return this.artHiveQuestionare.get('ETC') as FormArray;
  // }

  addMember() {
    this.membersName.push(this.formBuilder.control('', Validators.required));
  }

  removeMember(index: number) {
    if (this.membersName.length > 1) {
      this.membersName.removeAt(index);
    }
  }

  addContact() {
    this.contactList.push(this.formBuilder.group({
      contactName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern('^([0-9]{3})[-]?([0-9]{3})[-]?([0-9]{4})$')]]
    }));
  }

  removeContact(index: number) {
    if (this.contactList.length > 1) {
      this.contactList.removeAt(index);
    }
  }

  addPartner() {
    this.partnerList.push(this.formBuilder.control('', Validators.required));
  }

  removePartner(index: number) {
    if (this.partnerList.length > 1) {
      this.partnerList.removeAt(index);
    }
  }

  addFacilitator() {
    this.facilitatorList.push(this.formBuilder.control('', Validators.required));
  }

  removeFacilitator(index: number) {
    if (this.facilitatorList.length > 1) {
      this.facilitatorList.removeAt(index);
    }
  }

  addInstitution() {
    this.numStudentsList.push(this.formBuilder.group({
      numStudents: ['', Validators.required],
      eduInstitution: ['', Validators.required],
    }));
  }

  removeInstitution(index: number) {
    if (this.numStudentsList.length > 1) {
      this.numStudentsList.removeAt(index);
    }
  }

  addExpression(){
    this.formsOfExpressionsList.push(this.formBuilder.group({
      formsOfExpressionType: ['', Validators.required],
      numOfExpression: ['', Validators.required]
    }));
  }

  removeExpression(index: number){
    if (this.formsOfExpressionsList.length > 1) {
      this.formsOfExpressionsList.removeAt(index);
    }
  }

  addMaterialsUsed(){
    this.materialsUsedList.push(this.formBuilder.group({
      materialsUsedType: ['', Validators.required],
      numMaterialsUsed: ['', Validators.required]
    }));
  }

  removeMaterialsUsed(index: number){
    if (this.materialsUsedList.length > 1) {
      this.materialsUsedList.removeAt(index);
    }
  }

  onSubmit() {
    if (this.artHiveQuestionare.valid) {
      console.log(this.artHiveQuestionare.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
