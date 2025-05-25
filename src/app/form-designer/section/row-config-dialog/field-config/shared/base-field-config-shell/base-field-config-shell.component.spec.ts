import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFieldConfigShellComponent } from './base-field-config-shell.component';

describe('BaseFieldConfigShellComponent', () => {
  let component: BaseFieldConfigShellComponent;
  let fixture: ComponentFixture<BaseFieldConfigShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseFieldConfigShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseFieldConfigShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
