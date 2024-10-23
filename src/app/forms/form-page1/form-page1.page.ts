import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
//import { db } from 'src/main';
import {FirestoreService } from 'src/app/services/firestore.service';
import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-form-page1',
  templateUrl: './form-page1.page.html',
  styleUrls: ['./form-page1.page.scss']
})
export class FormPage1Page implements OnInit {
  artHiveQuestionare!: FormGroup;
  etcLabels: string[] = ['kinesthetic', 'sensory', 'perceptual', 'affective', 'cognitive', 'symbolic', 'creative'];

  constructor(private formBuilder: FormBuilder, private firestoreService: FirestoreService, private globalService: GlobalService) {}

  ngOnInit() {
    this.artHiveQuestionare = this.formBuilder.group({
      membersName: this.formBuilder.array([]),
      startDateLabel: ['Start date'],
      startDate: ['', Validators.required],
      endDateLabel: ['End date'],
      endDate: ['', Validators.required],
      locationNameLabel: ['Name'],
      locationName: ['', Validators.required],
      streetLabel: ['Street'],
      street: ['', Validators.required],
      cityLabel: ['City'],
      city: ['', Validators.required],
      stateLabel: ['State'],
      state: ['', Validators.required],
      zipLabel: ['ZIP'],
      zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      contactList: this.formBuilder.array([]),
      partnerList: this.formBuilder.array([]),
      facilitatorList: this.formBuilder.array([]),
      numParticipantsLabel: ['Number of participants (include facilitators)'],
      numParticipants: ['', Validators.required],
      numSeniorsLabel: ['Approximate number of older adults >= 65'],
      numSeniors: ['', Validators.required],
      numStudentsList: this.formBuilder.array([]),
      numChildrenLabel: ['Number of children'],
      numChildren: ['', Validators.required],
      numNewParticipantsLabel: ['Number of new participants'],
      numNewParticipants: ['', Validators.required],
      DiscoveryMethodZero: ['Word of mouth'],
      DiscoveryMethodOne: ['Passing by and being curious'],
      DiscoveryMethodTwo: ['Social Media'],
      discoveryMethods: this.formBuilder.array([
        this.formBuilder.group({ checked: [false] }), // Word of mouth
        this.formBuilder.group({ checked: [false] }), // Passing by
        this.formBuilder.group({ checked: [false] }), // Social media
      ]),
      otherDiscoverylabel: ['If other, please specify'],
      otherDiscovery: [''],
      EDIQuestionsLabel: ['Were there any discussions related to EDI topics (age, gender, sexual orientation, ethnicity/race, disability, religion, neighborhood, etc.)?'],
      EDIQuestions: [''],
      selfIDLabel: ['If self-identification occurred, what may have facilitated it?'],
      selfID: [''],
      commonGroundLabel: ['If needed, was a common ground found? If so, how (shared goals, community projects, etc.)?'],
      commonGround: [''],
      underRepresentedPerspectivesLabel: ['What could be done to reach out for under-represented perspectives? (If any suggestions from the group)'],
      underRepresentedPerspectives: [''],
      underRepresentedPerspectivesReachOutLabel: ['What could be done to reach out for under-represented perspectives? (If any suggestions from the group)'],
      underRepresentedPerspectivesReachOut: [''],
      formsOfExpressionsList: this.formBuilder.array([]),
      themesAndSymbolsLabel: ['Themes & symbols (please do not write techniques and art materials here)'],
      themesAndSymbols: [''],
      materialsUsedList: this.formBuilder.array([]),
      selectedETCLabel: ['Expressive Therapies Continuum (ETC)'],
      selectedETC: ['', Validators.required],
      discussionCommunityLabel: ['Discussion Theme: related to community'], 
      discussionCommunity: [''],
      discussionArtmakingLabel: ['Discussion themes: related to artmaking'],
      discussionArtmaking: [''],
      discussionSelfCareLabel: ['Discussion themes: self-care and personal successes'],
      discussionSelfCare: [''],
      discussionChallengesLabel: ['Discussion themes: challenges'],
      discussionChallenges: [''],
      discussionOtherLabel: ['Discussion themes: other'],
      discussionOther: [''],
      highlightsSpaceLabel: ['Highlights: holding the physical/digital space'],
      highlightsSpace: [''],
      highlightsCommunityLabel: ['Highlights: community experience'],
      highlightsCommunity: [''],
      highlightsEnvironmentLabel: ['Highlights: accessible, third-space studio environment'],
      highlightsEnvironment: [''],
      highlightsLeadershipLabel: ['Highlights: participants\' leadership (e.g., participants taking lead in explaining a technique to the group - or offering to do a skill share, or an idea about a community activity they want to start, participants being ambassadors for our activities, etc.)'],
      highlightsLeadership: [''],
      highlightsBoundariesLabel: ['Highlights: boundaries'],
      highlightsBoundaries: [''],
      highlightsOtherLabel: ['Highlights: other'],
      highlightsOther: [''],
      challengesSpaceLabel: ['Challenges: holding the physical/digital space'],
      challengesSpace: [''],
      challengesCommunityLabel: ['Challenges: community experience'],
      challengesCommunity: [''],
      challengesArtmakingLabel: ['Challenges: artmaking'],
      challengesArtmaking: [''],
      challengesEnvironmentLabel: ['Challenges: accessible, third space studio environment'],
      challengesEnvironment: [''],
      challengesLeadershipLabel: ['Challenges: participants\' leadership'],
      challengesLeadership: [''],
      challengesBoundariesLabel: ['Challenges: boundaries'],
      challengesBoundaries: [''],
      challengesOtherLabel: ['Challenges: other'],
      challengesOther: [''],
      circleofCareLabel: ['Circles of Care connections (e.g., friendships forming between participants, participant(s) sharing resources of self-care activities with the group, participants opening discussions about their circle of care, etc.)'],
      circleOfCare: [''],
      testimoniesLabel: ['Testimonies - direct quotes from individuals - please do not write down names'],
      testimonies: [''],
      proposedThemesLabel: ['Proposed themes/interests from participants'],
      proposedThemes: [''],
      actionItemsLabel: ['Action items required and who will follow up'],
      actionItems: [''],
      researchQuestionsLabel: ['Potential research questions'],
      researchQuestions: [''],
      Timestamp: new Date()
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

  getLabel(index: number): string {
    return index === 0 ? 'Word of mouth' : index === 1 ? 'Passing by and being curious' : 'Social media';
  }

  get formsOfExpressionsList(){
    return this.artHiveQuestionare.get('formsOfExpressionsList') as FormArray;
  }

  get materialsUsedList(){
    return this.artHiveQuestionare.get('materialsUsedList') as FormArray;
  }

  // get ETC() {
  //   return this.artHiveQuestionare.get('ETC') as FormArray;
  // }

  addMember() {
    this.membersName.push(
      this.formBuilder.group({
        membersNameLabel: ['Member\'s name'],
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
        contactNameLabel: ['Name'],
        contactName: ['', Validators.required],
        contactEmailLabel: ['Email'],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhoneLabel: ['Phone number'],
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
        partnerNameLabel: ['Partner\'s name'],
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
        facilitatorListLabel: ['Facilitator\'s name'],
        facilitatorListInput: ['', Validators.required]
      })
    );
  }

  removeFacilitator(index: number) {
    this.facilitatorList.removeAt(index);
  }

  addInstitution() {
    this.numStudentsList.push(this.formBuilder.group({
      numStudentsLabel: ['Numbers of students'],
      numStudents: ['', Validators.required],
      eduInstitutionLabel: ['Educational institution'],
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
      formsOfExpressionsLabel: ['Form of art'],
      formsOfExpressionType: ['', Validators.required],
      numOfExpressionLabel: ['Number of art form'],
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
      materialsUsedLabel: ['Materials or instruments used'],
      materialsUsedType: ['', Validators.required],
      numMaterialsUsedLabel: ['Number materials or instruments used'],
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
      
      try {
        // Call the FirestoreService to add the document
        await this.firestoreService.addDocument(this.globalService.getUserId(), formData);
        console.log('Form data saved successfully!');
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
