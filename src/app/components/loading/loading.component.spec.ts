import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadingComponent } from './loading.component';
import { StoreModule, Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { hide, show } from 'src/store/loading/loading.actions';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      imports: [IonicModule.forRoot(), StoreModule.forRoot([]), StoreModule.forFeature("loading", loadingReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.inject(Store);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide loading component when not loading', () =>{
    const compiled = fixture.nativeElement;

    store.dispatch(hide());
    fixture.detectChanges();

    expect(compiled.querySelector(".backdrop")).toBeNull();
    
  })

  it('should show loading component when loading', () =>{

    const compiled = fixture.nativeElement;

    store.dispatch(show());
    fixture.detectChanges();
    
    expect(compiled.querySelector(".backdrop")).not.toBeNull();
    
  })
});
