import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormlyDatepickerModule } from '@ngx-formly/primeng/datepicker';
import { FormlyInputModule } from '@ngx-formly/primeng/input';
import { FormlySelectModule } from '@ngx-formly/primeng/select';
import { FormlyTextAreaModule } from '@ngx-formly/primeng/textarea';
import { FormlyCheckboxModule } from '@ngx-formly/primeng/checkbox';
import { FormlyRadioModule } from '@ngx-formly/primeng/radio';
import { FormlyFormFieldModule } from '@ngx-formly/primeng/form-field';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { DockModule } from 'primeng/dock';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [
        PanelModule,
        ButtonModule,
        DividerModule,
        DynamicDialogModule,
        EditorModule,
        InputTextModule,
        SplitButtonModule,
        ConfirmDialogModule,
        ToastModule,
        FormlyDatepickerModule,
        FormlyInputModule,
        FormlySelectModule,
        FormlyTextAreaModule,
        FormlyCheckboxModule,
        FormlyRadioModule,
        FormlyFormFieldModule,
        TabViewModule,
        TooltipModule,
        MenubarModule,
        DockModule,
        AccordionModule,
        DropdownModule,
        CheckboxModule,
        MultiSelectModule
    ]
})
export class FormlyComponentModule {}
