import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
//import { db } from 'src/main';
import {FirestoreService } from 'src/app/services/firestore.service';
import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { GlobalService } from 'src/app/services/global.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-form-page1',
  templateUrl: './form-page1.page.html',
  styleUrls: ['./form-page1.page.scss']
})
export class FormPage1Page implements OnInit {
  artHiveQuestionare!: FormGroup;
  //etcLabels: string[] = ['kinesthetic', 'sensory', 'perceptual', 'affective', 'cognitive', 'symbolic', 'creative'];

  constructor(private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private globalService: GlobalService,
    private alertController: AlertController) {}

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

  ngOnInit() {
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

      timestamp: new Date()
    });

    console.log(this.membersName); // Check if it is defined
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

  // getLabel(index: number): string {
  //   return index === 0 ? 'Word of mouth' : index === 1 ? 'Passing by and being curious' : 'Social media';
  // }

  get formsOfExpressionsList(){
    return this.artHiveQuestionare.get('formsOfExpressionsList') as FormArray;
  }

  get materialsUsedList(){
    return this.artHiveQuestionare.get('materialsUsedList') as FormArray;
  }

  get selectedETC() {
    return (this.artHiveQuestionare.get('selectedETC') as FormArray);
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
        console.log('Form data saved successfully!');
        
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
  

}
