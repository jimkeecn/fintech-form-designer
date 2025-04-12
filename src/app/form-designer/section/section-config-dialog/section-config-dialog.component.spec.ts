import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionConfigDialogComponent } from './section-config-dialog.component';

describe('SectionConfigDialogComponent', () => {
  let component: SectionConfigDialogComponent;
  let fixture: ComponentFixture<SectionConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionConfigDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
