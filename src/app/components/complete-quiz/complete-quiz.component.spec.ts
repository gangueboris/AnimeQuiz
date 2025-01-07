import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteQuizComponent } from './complete-quiz.component';

describe('CompleteQuizComponent', () => {
  let component: CompleteQuizComponent;
  let fixture: ComponentFixture<CompleteQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
