import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestoComponent } from './testo.component';

describe('TestoComponent', () => {
  let component: TestoComponent;
  let fixture: ComponentFixture<TestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
