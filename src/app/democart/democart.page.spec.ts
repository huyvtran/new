import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemocartPage } from './democart.page';

describe('DemocartPage', () => {
  let component: DemocartPage;
  let fixture: ComponentFixture<DemocartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemocartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemocartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
