import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [PanelModule, ButtonModule, DividerModule]
})
export class FormlyComponentModule {}
