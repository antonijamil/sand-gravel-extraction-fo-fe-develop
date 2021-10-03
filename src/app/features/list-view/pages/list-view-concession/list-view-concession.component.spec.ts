import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewConcessionComponent } from './list-view-concession.component';

describe('ListViewConcessionComponent', () => {
  let component: ListViewConcessionComponent;
  let fixture: ComponentFixture<ListViewConcessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewConcessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewConcessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
