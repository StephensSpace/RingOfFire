import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktionskarteComponent } from './aktionskarte.component';

describe('AktionskarteComponent', () => {
  let component: AktionskarteComponent;
  let fixture: ComponentFixture<AktionskarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AktionskarteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktionskarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
