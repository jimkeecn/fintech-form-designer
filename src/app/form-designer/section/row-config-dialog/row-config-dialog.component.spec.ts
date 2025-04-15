import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowConfigDialogComponent } from './row-config-dialog.component';

describe('RowConfigDialogComponent', () => {
  let component: RowConfigDialogComponent;
  let fixture: ComponentFixture<RowConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RowConfigDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
