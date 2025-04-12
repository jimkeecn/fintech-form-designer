import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [PanelModule, ButtonModule, DividerModule, DynamicDialogModule, EditorModule, InputTextModule]
})
export class FormlyComponentModule {}
