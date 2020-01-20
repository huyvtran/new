import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestoPage } from './testo.page';

describe('TestoPage', () => {
  let component: TestoPage;
  let fixture: ComponentFixture<TestoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
