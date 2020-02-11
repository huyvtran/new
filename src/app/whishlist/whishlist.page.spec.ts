import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhishlistPage } from './whishlist.page';

describe('WhishlistPage', () => {
  let component: WhishlistPage;
  let fixture: ComponentFixture<WhishlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhishlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhishlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
