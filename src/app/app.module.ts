import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormOptionsComponent } from './form-options/form-options.component';
import { FormDesignerComponent } from './form-designer/form-designer.component';
import { DropAreaComponent } from './form-designer/section/drop-area/drop-area.component';

@NgModule({
    declarations: [AppComponent, FormOptionsComponent, FormDesignerComponent, DropAreaComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ButtonModule,
        FormlyModule.forRoot(),
        ReactiveFormsModule,
        FormlyPrimeNGModule,
        DragDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
