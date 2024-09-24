import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPage1Page } from './form-page1.page';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('FormPage1Page', () => {
  let component: FormPage1Page;
  let fixture: ComponentFixture<FormPage1Page>;
  let formBuilder: FormBuilder;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [FormPage1Page],
      imports: [
        ReactiveFormsModule, IonicModule.forRoot()
      ],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPage1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder)
  });

  it('should create a form on init', () => {
    component.ngOnInit();
    expect(component.artHiveQuestionare).not.toBeUndefined();
  });

  it('should create the form with membersName FormArray', () => {
    expect(component.artHiveQuestionare).toBeDefined();
    expect(component.membersName).toBeDefined();
    expect(component.membersName.controls.length).toBe(0); // Since it is initially empty
  });

  it('should add a new member to the membersName FormArray', () => {
    component.addMember();
    expect(component.membersName.length).toBe(1); // Check if a member has been added
    expect(component.membersName.at(0)).toBeDefined(); // Check if the new FormControl is defined
  });

  it('should remove a member from the FormArray', () =>{
    component.addMember(); // Add a member to ensure there is something to remove
    component.removeMember(0); // Remove the member
    expect(component.membersName.length).toBe(0); // Ensure the FormArray is empty
  });

  it('should get values from the FormControls', () =>{
    component.addMember();
    const memberControl = component.membersName.at(0);
    memberControl.setValue('John Doe');
    expect(memberControl.value).toBe('John Doe');
  });

  it('should have required validators for adding a new member', () => {
    component.addMember();
    expect(component.membersName.hasError('required'));
  });

  it('should initialize start and end date controls', () => {
    const StartDate = component.artHiveQuestionare.get('startDate');
    const EndDate = component.artHiveQuestionare.get('endDate');
    
    expect(StartDate?.hasError('required'));
    expect(EndDate?.hasError('required'));

    expect(StartDate).toBeDefined();
    expect(EndDate).toBeDefined();
    
    expect(StartDate?.value).toBe('');
    expect(EndDate?.value).toBe('');

  });

  it('should set the Start and End dates to be empty and invalid', () =>{
    component.artHiveQuestionare.patchValue({
      startDate: '',
      endDate: ''
    });
    expect(component.artHiveQuestionare.invalid).toBeTrue();
  });

  it('should fill the start and end dates and be valid', () =>{
    component.artHiveQuestionare.patchValue({
      startDate: "2001-11-24",
      endDate: "2024-01-02"
    });
    expect(component.artHiveQuestionare.get('startDate')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('endDate')?.valid).toBeTrue();
  });

  it('should initialize address controls',() =>{
    const locationControl = component.artHiveQuestionare.get('locationName');
    const streetControl = component.artHiveQuestionare.get('street');
    const cityControl = component.artHiveQuestionare.get('city');
    const stateControl = component.artHiveQuestionare.get('state');
    const zipControl = component.artHiveQuestionare.get('zip');

    expect(locationControl?.hasError('required')).toBeTrue();
    expect(streetControl?.hasError('required')).toBeTrue();
    expect(cityControl?.hasError('required')).toBeTrue();
    expect(stateControl?.hasError('required')).toBeTrue();
    expect(zipControl?.hasError('required')).toBeTrue();

    expect(locationControl?.value).toBe('');
    expect(streetControl?.value).toBe('');
    expect(cityControl?.value).toBe('');
    expect(stateControl?.value).toBe('');
    expect(zipControl?.value).toBe('');
  });

  it('should set the address controls to be empty and invalid', () =>{
    component.artHiveQuestionare.patchValue({
      locationName: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    });
    expect(component.artHiveQuestionare.invalid).toBeTrue();
  });

  it('should fill the address controls and set them to valid', () =>{
    component.artHiveQuestionare.patchValue({
      locationName: 'SIUE Engineering Building',
      street: 'University Dr.',
      city: 'Edwardsville',
      state: 'IL',
      zip: '62208'
    });

    expect(component.artHiveQuestionare.get('locationName')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('street')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('city')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('state')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('zip')?.valid).toBeTrue();
  });

  it('should fill the zip formControl with an invalid input', () => {
    component.artHiveQuestionare.patchValue({zip: 'text'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();

    component.artHiveQuestionare.patchValue({zip: ''});
    component.artHiveQuestionare.patchValue({zip: '623'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();

    component.artHiveQuestionare.patchValue({zip: ''});
    component.artHiveQuestionare.patchValue({zip: '633252'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();

    component.artHiveQuestionare.patchValue({zip: ''});
    component.artHiveQuestionare.patchValue({zip: '62th3'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();
  });

  it('should initialize contactList controls and test validators', () => {
    component.addContact();
  
    const contactGroup = component.contactList.at(0) as FormGroup;
  
    expect(contactGroup.contains('contactName')).toBeTrue();
    expect(contactGroup.contains('contactEmail')).toBeTrue();
    expect(contactGroup.contains('contactPhone')).toBeTrue();
  
    const contactNameControl = contactGroup.get('contactName');
    const contactEmailControl = contactGroup.get('contactEmail');
    const contactPhoneControl = contactGroup.get('contactPhone');
  
    expect(contactNameControl?.hasError('required')).toBeTrue();
    expect(contactEmailControl?.hasError('required')).toBeTrue();
    expect(contactPhoneControl?.hasError('required')).toBeTrue();
  
    expect(contactNameControl?.value).toBe('');
    expect(contactEmailControl?.value).toBe('');
    expect(contactPhoneControl?.value).toBe('');
  });

  it('should create the contactList FormArray', () =>{
    expect(component.contactList).toBeDefined();
    expect(component.contactList.controls.length).toBe(0); // Since it is initially empty
  });

  it('should add a new contact to the contactList FormArray', () => {
    component.addContact();
    expect(component.contactList.length).toBe(1); // Check if a member has been added
    expect(component.contactList.at(0)).toBeDefined(); // Check if the new FormControl is defined
  });

  it('should remove a member from the contactList FormArray', () =>{
    component.removeContact(0); // Remove the member
    expect(component.contactList.length).toBe(0); // Ensure the FormArray is empty
  });

  it('should set the contactList controls to be empty and invalid', () => {
    component.addContact();
    const contactForm = component.contactList.at(0);

    contactForm.patchValue({
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    });

    expect(contactForm.get('contactName')?.invalid).toBeTrue();
    expect(contactForm.get('contactEmail')?.invalid).toBeTrue();
    expect(contactForm.get('contactPhone')?.invalid).toBeTrue();
  });

  it('should fill the contactList controls and be valid', () =>{
    component.addContact();
    const contactForm = component.contactList.at(0);

    contactForm.patchValue({
      contactName: 'John Doe',
      contactEmail: 'test@email.com',
      contactPhone: '800-111-1111'
    });

    expect(contactForm.get('contactName')?.valid).toBeTrue;
    expect(contactForm.get('contactEmail')?.valid).toBeTrue();
    expect(contactForm.get('contactPhone')?.valid).toBeTrue();

    contactForm.patchValue({
      contactName: 'John Doe',
      contactEmail: 'test@email.com',
      contactPhone: '8001111111'
    });

    expect(contactForm.get('contactName')?.valid).toBeTrue();
    expect(contactForm.get('contactEmail')?.valid).toBeTrue();
    expect(contactForm.get('contactPhone')?.valid).toBeTrue();
  });

  it('should fill the contactNumber and contactPhone and be invalid', () =>{
    component.addContact();

    const contactForm = component.contactList.at(0);
    contactForm.patchValue({
      contactEmail: 'test',
      contactPhone: '(800)1111111'
    });

    expect(contactForm.get('contactEmail')?.invalid).toBeTrue();
    expect(contactForm.get('contactPhone')?.invalid).toBeTrue();
  });

  it('should create a parnerList Form Array', () =>{
    expect(component.partnerList).toBeDefined();
    expect(component.partnerList.controls.length).toBe(0);
  });

  it('should add a new partner to the partnerList FormArray', () => {
    component.addPartner();
    expect(component.partnerList.length).toBe(1); // Check if a member has been added
    expect(component.partnerList.at(0)).toBeDefined(); // Check if the new FormControl is defined
  });

  it('should add and remove a partner from the partnerList Form Array', () =>{
    component.addPartner();
    component.removePartner(0);
    expect(component.partnerList.length).toBe(0);
  });

  it('should add empty values to the partnerList and register as invalid', () =>{
    component.addPartner();
    const partnerControl = component.partnerList.at(0);  // Get the first control in the FormArray
    partnerControl.setValue('');  // Set it to an empty string
    expect(partnerControl.invalid).toBeTrue();
  });

  it('should add values to the partnerList and register as valid', () => {
    component.addPartner();
    const partnerControl = component.partnerList.at(0);
    partnerControl.setValue('John Doe');
    expect(partnerControl.valid).toBeTrue();
    expect(partnerControl.value).toBe('John Doe');
  });

  it('should test partnerList validators', () =>{
    component.addPartner();
    expect(component.partnerList.hasError('required'));
  });

  it('should create a facilitatorList Form Array', () => {
    expect(component.facilitatorList).toBeDefined();
    expect(component.facilitatorList.controls.length).toBe(0); // Since it is initially empty
  });

  it('should create the facilitatorList controls and test validators', () =>{
    component.addFacilitator();
    expect(component.facilitatorList.hasError('required'));
  });

  it('should add a facilitator to the Form Array', () => {
    component.addFacilitator();
    const facilitatorControl = component.facilitatorList.at(0);
    expect(component.facilitatorList.length).toBe(1);
    expect(component.facilitatorList).toBeTruthy();
    expect(facilitatorControl).toBeTruthy();
  });

  it('should add and then remove a control from the facilitator Form Array', () =>{
    component.addFacilitator();
    expect(component.facilitatorList.length).toBe(1);
    component.removeFacilitator(0);
    expect(component.facilitatorList.length).toBe(0);
  });

  it('should add an empty value to the facilitatorList Form Array and register as invalid', () =>{
    component.addFacilitator();
    const facilitatorControl = component.facilitatorList.at(0);
    facilitatorControl.setValue('');
    expect(facilitatorControl.invalid).toBeTrue();
    expect(facilitatorControl).toBeTruthy();
  });

  it('should add a value to the facilitator Form Array and register as valid', () =>{
    component.addFacilitator();
    const facilitatorControl = component.facilitatorList.at(0);
    facilitatorControl.setValue('John Doe');
    expect(facilitatorControl.valid).toBeTrue();
    expect(facilitatorControl).toBeTruthy();
    expect(facilitatorControl.value).toBe('John Doe');
  });

  
  it('should initialize numParticipants controls', () => {
    const numPartControl = component.artHiveQuestionare.get('numParticipants');
    
    expect(numPartControl?.hasError('required'));
    expect(numPartControl).toBeDefined();
    expect(numPartControl?.value).toBe('');
    expect(numPartControl).toBeTruthy();
  });

  it('should create an empty numParticipants Value and register as invalid', () =>{
    component.artHiveQuestionare.patchValue({numParticipants: ''});

    expect(component.artHiveQuestionare.get('numParticipants')?.invalid).toBeTrue();
    expect(component.artHiveQuestionare.get('numParticipants')).toBeTruthy();

  })

  it('should fill numParticipants and register as valid', () =>{
    component.artHiveQuestionare.patchValue({numParticipants: '5'});

    expect(component.artHiveQuestionare.get('numParticipants')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('numParticipants')).toBeTruthy();
  })

  it('should create the numStudentsList controls as a FormArray' , () => {
    expect(component.numStudentsList).toBeDefined();
    expect(component.numStudentsList.controls.length).toBe(0);
  })

  it('should add a member to the numStudentsList' , () =>{
    component.addInstitution();
    expect(component.numStudentsList.length).toBe(1);
    expect(component.numStudentsList.at(0)).toBeDefined();
  })

  it('should test the numStudentsList validator', () =>{
    component.addInstitution();

    const numStudentListControls = component.numStudentsList.at(0) as FormGroup;
    
    expect(numStudentListControls).toBeDefined();

    expect(numStudentListControls.contains('numStudents')).toBeTrue();
    expect(numStudentListControls.contains('eduInstitution')).toBeTrue();

    const numStudentControl = numStudentListControls?.get('numStudents');
    const eduInstitutionControl = numStudentListControls?.get('eduInstitution');

    expect(numStudentControl?.hasError('required')).toBeTrue();
    expect(eduInstitutionControl?.hasError('required')).toBeTrue();

    expect(numStudentControl?.value).toBe('');
    expect(eduInstitutionControl?.value).toBe('');
  })

  it('should initialize the discoveryMethods Form Array', () =>{
    const discoveryMethodsArray = component.artHiveQuestionare.get('discoveryMethods') as FormArray;
    
    expect(discoveryMethodsArray).toBeDefined();
    expect(component.artHiveQuestionare.get('otherDiscovery')).toBeDefined();

    expect(discoveryMethodsArray.at(0).get('checked')?.value).toBeFalse();  // Word of mouth
    expect(discoveryMethodsArray.at(1).get('checked')?.value).toBeFalse();  // Passing by
    expect(discoveryMethodsArray.at(2).get('checked')?.value).toBeFalse();  // Social media
    expect(component.artHiveQuestionare.get('otherDiscovery')?.value).toBe('');
  })

  it('should fill the values for the Discovery Methods and register them as true', () =>{
    const discoveryMethodsArray = component.artHiveQuestionare.get('discoveryMethods') as FormArray;

    discoveryMethodsArray.at(0).patchValue({ checked: true });
    discoveryMethodsArray.at(1).patchValue({ checked: true });
    discoveryMethodsArray.at(2).patchValue({ checked: true });
    component.artHiveQuestionare.get('otherDiscovery')?.patchValue('test');
    expect(discoveryMethodsArray.at(0).get('checked')?.value).toBeTrue();
    expect(discoveryMethodsArray.at(1).get('checked')?.value).toBeTrue();
    expect(discoveryMethodsArray.at(2).get('checked')?.value).toBeTrue();
    expect(component.artHiveQuestionare.get('otherDiscovery')?.value).toBe('test');

    discoveryMethodsArray.at(0).patchValue({ checked: true });
    discoveryMethodsArray.at(1).patchValue({ checked: false });
    discoveryMethodsArray.at(2).patchValue({ checked: false });
    component.artHiveQuestionare.get('otherDiscovery')?.patchValue('');
    expect(discoveryMethodsArray.at(0).get('checked')?.value).toBeTrue();
    expect(discoveryMethodsArray.at(1).get('checked')?.value).toBeFalse();
    expect(discoveryMethodsArray.at(2).get('checked')?.value).toBeFalse();
    expect(component.artHiveQuestionare.get('otherDiscovery')?.value).toBe('');

    discoveryMethodsArray.at(0).patchValue({ checked: false });
    discoveryMethodsArray.at(1).patchValue({ checked: true });
    discoveryMethodsArray.at(2).patchValue({ checked: false });
    component.artHiveQuestionare.get('otherDiscovery')?.patchValue('');
    expect(discoveryMethodsArray.at(0).get('checked')?.value).toBeFalse();
    expect(discoveryMethodsArray.at(1).get('checked')?.value).toBeTrue();
    expect(discoveryMethodsArray.at(2).get('checked')?.value).toBeFalse();
    expect(component.artHiveQuestionare.get('otherDiscovery')?.value).toBe('');
  })

  it('should initialize the EDIQuestion initialize', () =>{
    expect(component.artHiveQuestionare.get('EDIQuestions')).toBeDefined();
    expect(component.artHiveQuestionare.get('EDIQuestions')).toBeTruthy();
  })

  it('should fill the EDIQuestion with an empty variable and register as invalid', () =>{
    component.artHiveQuestionare.get('EDIQuestions')?.patchValue('');
    expect(component.artHiveQuestionare.get('EDIQuestions')?.value).toBe('');
  })

  it('should fill the EDIQuestion with a variable and register as invalid', () =>{
    component.artHiveQuestionare.get('EDIQuestions')?.patchValue('test');
    expect(component.artHiveQuestionare.get('EDIQuestions')?.value).toBe('test');
  })

  it('should initialize the formsOfExpressionsList Form Array', () =>{
    expect(component.formsOfExpressionsList).toBeDefined();
    expect(component.formsOfExpressionsList.controls.length).toBe(0); // Since it is initially empty
    expect(component.formsOfExpressionsList).toBeTruthy();
  })

  it('should add and remove a member to the formsOfExperssionsList and test the validators', () =>{
    component.addExpression();
    expect(component.formsOfExpressionsList.controls.length).toBe(1);

    const formsOfExpressionsListControl = component.formsOfExpressionsList.at(0) as FormGroup;

    expect(formsOfExpressionsListControl.get('formsOfExpressionType')?.hasError('required')).toBeTrue();
    expect(formsOfExpressionsListControl.get('numOfExpression')?.hasError('required')).toBeTrue();

    component.removeExpression(0);
    expect(component.formsOfExpressionsList.controls.length).toBe(0);
  })

  it('should add an empty member to the formsOfExpressions and register it as invalid', () =>{
    component.addExpression();
    const formsOfExpressionsListControl = component.formsOfExpressionsList.at(0) as FormGroup;

    formsOfExpressionsListControl.patchValue({
      formsOfExpressionType: '',
      numOfExpression: ''
    });

    expect(formsOfExpressionsListControl.get('formsOfExpressionType')?.value).toBe('');
    expect(formsOfExpressionsListControl.get('numOfExpression')?.value).toBe('');

  })

  it('should add a member to the formsOfExpressions and register it as valid', () =>{
    component.addExpression();
    const formsOfExpressionsListControl = component.formsOfExpressionsList.at(0) as FormGroup;

    formsOfExpressionsListControl.patchValue({
      formsOfExpressionType: 'test',
      numOfExpression: '5'
    });

    expect(formsOfExpressionsListControl.get('formsOfExpressionType')?.value).toBe('test');
    expect(formsOfExpressionsListControl.get('numOfExpression')?.value).toBe('5');
  })

  it('should initialize themesAndSymbols', () =>{
    expect(component.artHiveQuestionare.get('themesAndSymbols')).toBeTruthy();
    expect(component.artHiveQuestionare.get('themesAndSymbols')).toBeDefined();
  })

  it('should fill first fill themesAndSymbols with empty data and be invalid, then fill it again with real data and be valid' ,() =>{
    component.artHiveQuestionare.get('themesAndSymbols')?.patchValue('');
    expect(component.artHiveQuestionare.get('themesAndSymbols')?.value).toBe('');

    component.artHiveQuestionare.get('themesAndSymbols')?.patchValue('testing');
    expect(component.artHiveQuestionare.get('themesAndSymbols')?.value).toBe('testing');
  })

  it('should initialize the materialsUsedList formControlArray', () =>{
    expect(component.materialsUsedList).toBeDefined();
    expect(component.materialsUsedList.length).toBe(0);
    expect(component.materialsUsedList).toBeTruthy();
  })

  it('should add and removed a member of the materialsUsedList formArrayName and test their validators', () =>{
    component.addMaterialsUsed();
    expect(component.materialsUsedList.length).toBe(1);

    component.removeMaterialsUsed(0);
    expect(component.materialsUsedList.length).toBe(0);

    component.addMaterialsUsed();
    const materialsUsedListControl = component.materialsUsedList.at(0) as FormGroup;

    expect(materialsUsedListControl.get('materialsUsedType')?.hasError('required')).toBeTrue();
    expect(materialsUsedListControl.get('numMaterialsUsed')?.hasError('required')).toBeTrue();
  })

  it('should initially add an empty input into the materialsUsedList Form Array and be invalid, then it should add a valid input and register as valid', () =>{
    component.addMaterialsUsed();
    const materialsUsedListControl = component.materialsUsedList.at(0) as FormGroup;

    materialsUsedListControl.patchValue({
      materialsUsedType: '',
      numMaterialsUsed: 0
    });

    expect(materialsUsedListControl.get('materialsUsedType')?.value).toBe('');
    expect(materialsUsedListControl.get('numMaterialsUsed')?.value).toBe(0);

    materialsUsedListControl.patchValue({
      materialsUsedType: 'oil paint',
      numMaterialsUsed: 6
    });

    expect(materialsUsedListControl.get('materialsUsedType')?.value).toBe('oil paint');
    expect(materialsUsedListControl.get('numMaterialsUsed')?.value).toBe(6);
  })  

  it('should initialize the radio buttons for selectedETC', () =>{
    expect(component.artHiveQuestionare.get('selectedETC')).toBeDefined();
    expect(component.artHiveQuestionare.get('selectedETC')).toBeTruthy();
    expect(component.artHiveQuestionare.get('selectedETC')?.invalid).toBeTrue();

    expect(component.artHiveQuestionare.get('selectedETC')?.hasError('required')).toBeTrue();
  })

  it('should select a radio button and store the value', () =>{
    component.artHiveQuestionare.get('selectedETC')?.patchValue('sensory');
    expect(component.artHiveQuestionare.get('selectedETC')?.value).toBe('sensory');
  })

  it('should initialize discussionCommunity formControl', () =>{
    expect(component.artHiveQuestionare.get('discussionCommunity')).toBeDefined();
    expect(component.artHiveQuestionare.get('discussionCommunity')).toBeTruthy();
  })

  it('should fill the discussionCommunity Form control', () =>{
    component.artHiveQuestionare.get('discussionCommunity')?.patchValue('test');
    expect(component.artHiveQuestionare.get('discussionCommunity')?.value).toBe('test');
  })
});
