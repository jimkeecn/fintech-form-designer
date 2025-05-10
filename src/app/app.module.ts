import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormOptionsComponent } from './form-options/form-options.component';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { DropAreaComponent } from './form-designer/section/drop-area/drop-area.component';
import { FormlyComponentModule } from './shared-modules/formly-component.module';
import { FormRootService } from './root-services/form-root-service.service';
import { ConfigPanelComponent } from './form-designer/section/config-panel/config-panel.component';
import { SectionConfigDialogComponent } from './form-designer/section/section-config-dialog/section-config-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RowConfigDialogComponent } from './form-designer/section/row-config-dialog/row-config-dialog.component';
import { FieldConfigComponent } from './form-designer/section/row-config-dialog/field-config/field-config.component';
import { FormReviewComponent } from './form-review/form-review.component';
import { FormSectionComponent } from './form-review/form-section/form-section.component';
import { FormlyFieldSections } from './models/multiple-section.type';

@NgModule({
    declarations: [
        AppComponent,
        FormOptionsComponent,
        FormDesignerComponent,
        DropAreaComponent,
        ConfigPanelComponent,
        SectionConfigDialogComponent,
        RowConfigDialogComponent,
        FieldConfigComponent,
        FormReviewComponent,
        FormSectionComponent,
        FormlyFieldSections
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormlyPrimeNGModule,
        FormlyModule.forRoot({
            types: [{ name: 'sections', component: FormlyFieldSections, wrappers: [] }]
        }),
        ReactiveFormsModule,
        DragDropModule,
        FormlyComponentModule
    ],
    providers: [FormRootService, ConfirmationService, MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
