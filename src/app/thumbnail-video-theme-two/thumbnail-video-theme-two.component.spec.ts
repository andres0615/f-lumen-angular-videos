import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailVideoThemeTwoComponent } from './thumbnail-video-theme-two.component';

describe('ThumbnailVideoThemeTwoComponent', () => {
  let component: ThumbnailVideoThemeTwoComponent;
  let fixture: ComponentFixture<ThumbnailVideoThemeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThumbnailVideoThemeTwoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailVideoThemeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
