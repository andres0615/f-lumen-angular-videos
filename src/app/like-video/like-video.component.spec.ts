import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeVideoComponent } from './like-video.component';

describe('LikeVideoComponent', () => {
  let component: LikeVideoComponent;
  let fixture: ComponentFixture<LikeVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeVideoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
