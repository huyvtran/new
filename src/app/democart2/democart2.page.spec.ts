import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Democart2Page } from './democart2.page';

describe('Democart2Page', () => {
  let component: Democart2Page;
  let fixture: ComponentFixture<Democart2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Democart2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Democart2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
