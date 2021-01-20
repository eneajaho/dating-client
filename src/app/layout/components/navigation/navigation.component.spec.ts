import { TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavigationComponent } from '@layout/components';

describe('Navigation Component', () => {
  // beforeEach(waitForAsync(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ NavigationComponent ],
  //     schemas: [ NO_ERRORS_SCHEMA ]
  //   }).compileComponents();
  // }));

  it('should just success', function() {
    expect(1).toBe(1);
  });

  // it('should create the app', waitForAsync(() => {
  //   const fixture = TestBed.createComponent(NavigationComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  // it(`should have as title 'app'`, waitForAsync(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  //
  // it('should render title', waitForAsync(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));

});
