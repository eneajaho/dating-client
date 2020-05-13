import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditPhotosComponent } from './member-edit-photos.component';

describe('MemberEditPhotosComponent', () => {
  let component: MemberEditPhotosComponent;
  let fixture: ComponentFixture<MemberEditPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
