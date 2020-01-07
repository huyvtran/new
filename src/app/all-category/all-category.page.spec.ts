import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllCategoryPage } from './all-category.page';

describe('AllCategoryPage', () => {
  let component: AllCategoryPage;
  let fixture: ComponentFixture<AllCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
