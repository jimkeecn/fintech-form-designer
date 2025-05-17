import { Component } from '@angular/core';
import { FieldArrayType, FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-repeat-sections',
    styles: '',
    template: `
        @for(row of field.fieldGroup;track field.key){

        <formly-field [field]="row"></formly-field>
        <p-divider />
        }

        <button (click)="add()">Add New</button>
    `
})
export class RepeatFormlyFieldSections extends FieldArrayType {
    constructor() {
        super();
        console.log(this);
    }
}
