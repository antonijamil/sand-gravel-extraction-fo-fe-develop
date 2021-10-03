import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandGravelExtractionFormCreateComponent } from './sand-gravel-extraction-form-create.component';

describe('SandGravelExtractionFormCreateComponent', () => {
  let component: SandGravelExtractionFormCreateComponent;
  let fixture: ComponentFixture<SandGravelExtractionFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandGravelExtractionFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandGravelExtractionFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
