import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandGravelExtractionFormReadComponent } from './sand-gravel-extraction-form-read.component';

describe('SandGravelExtractionFormReadComponent', () => {
  let component: SandGravelExtractionFormReadComponent;
  let fixture: ComponentFixture<SandGravelExtractionFormReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandGravelExtractionFormReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandGravelExtractionFormReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
