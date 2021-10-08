import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailVideoThemeOneComponent } from './thumbnail-video-theme-one.component';

describe('ThumbnailVideoThemeOneComponent', () => {
  let component: ThumbnailVideoThemeOneComponent;
  let fixture: ComponentFixture<ThumbnailVideoThemeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThumbnailVideoThemeOneComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailVideoThemeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
