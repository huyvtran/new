import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResellerPage } from './reseller.page';

describe('ResellerPage', () => {
  let component: ResellerPage;
  let fixture: ComponentFixture<ResellerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResellerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
