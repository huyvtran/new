import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Chart2Page } from './chart2.page';

describe('Chart2Page', () => {
  let component: Chart2Page;
  let fixture: ComponentFixture<Chart2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chart2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Chart2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
