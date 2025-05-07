import { Component, Input, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FIELD_OPTION_LIST, FormRow, FormSection } from '../../models/dragable-list';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'ffw-form-section',
    templateUrl: './form-section.component.html',
    styleUrl: './form-section.component.scss'
})
export class FormSectionComponent implements OnInit {
    private _section!: FormSection;
    @Input()
    set section(section: FormSection) {
        if (section && section.rows.length > 0) {
            console.log('preview section change:', section);
            this._section = section;
            this._section.rows.forEach((row) => {
                if (row.fieldGroup.length > 0) {
                    const formlyRow: FormlyFieldConfig = {
                        fieldGroupClassName: row.fieldGroupClassName,
                        fieldGroup: row.fieldGroup.map((field, index) => {
                            return {
                                ...field.option,
                                key: field.option?.key ?? `field_${row.ffw_key}_${index}`
                            };
                        })
                    };
                    this.formgroup.push(formlyRow);
                    console.log(this.formgroup);
                }
            });
        }
    }
    get section() {
        return this._section;
    }

    formgroup: FormlyFieldConfig[] = [];

    constructor() {}

    ngOnInit(): void {}

    private getFieldConfiguration(key: string): FormlyFieldConfig[] {
        const options = FIELD_OPTION_LIST.filter((x) => x.key === key);
        if (!options) return [];
        return cloneDeep(options);
    }

    private getFormlyFields(row: FormRow) {
        if (!row.ffw_key) return;
        const formlyRow: FormlyFieldConfig = {
            fieldGroupClassName: row.fieldGroupClassName,
            fieldGroup: row.fieldGroup.map((field, index) => {
                return {
                    ...field.option,
                    key: field.option?.key ?? `field_${row.ffw_key}_${index}`
                };
            })
        };
    }
}
