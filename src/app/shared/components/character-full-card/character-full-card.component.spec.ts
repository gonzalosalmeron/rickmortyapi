import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFullCardComponent } from './character-full-card.component';

describe('CharacterFullCardComponent', () => {
  let component: CharacterFullCardComponent;
  let fixture: ComponentFixture<CharacterFullCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFullCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFullCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
