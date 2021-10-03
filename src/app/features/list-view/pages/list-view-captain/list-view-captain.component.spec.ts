import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewCaptainComponent } from './list-view-captain.component';

describe('ListViewCaptainComponent', () => {
  let component: ListViewCaptainComponent;
  let fixture: ComponentFixture<ListViewCaptainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewCaptainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
