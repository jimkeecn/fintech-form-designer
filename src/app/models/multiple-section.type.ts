import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-sections',
    styles: `
        :host{
            display:flex;
            flex-direction:column;
            gap:12px
        }
    `,
    template: `
        @for(section of field.fieldGroup;track field.key){ @if(!section.hide){
        <p-panel [header]="section.props?.label" class="tw-mt-3">
            <p class="tw-text-xs" [innerHTML]="section.props?.description"></p>
            <p-divider />
            <formly-field [field]="section"></formly-field>
        </p-panel>
        } }
    `
})
export class FormlyFieldSections extends FieldType {}
