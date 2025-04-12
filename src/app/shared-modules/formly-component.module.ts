import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [PanelModule, ButtonModule]
})
export class FormlyComponentModule {}
