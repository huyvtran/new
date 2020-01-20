import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderNowPage } from './order-now.page';

describe('OrderNowPage', () => {
  let component: OrderNowPage;
  let fixture: ComponentFixture<OrderNowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderNowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
