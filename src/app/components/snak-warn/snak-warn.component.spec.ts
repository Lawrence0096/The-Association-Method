import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakWarnComponent } from './snak-warn.component';

describe('SnakWarnComponent', () => {
  let component: SnakWarnComponent;
  let fixture: ComponentFixture<SnakWarnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnakWarnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakWarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
