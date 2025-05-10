import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormConfig } from '../models/dragable-list';
import { cloneDeep } from 'lodash';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'ffw-form-review',
    templateUrl: './form-review.component.html',
    styleUrl: './form-review.component.scss'
})
export class FormReviewComponent implements OnInit, OnDestroy {
    fields: FormlyFieldConfig[] = [];
    @Input()
    set setForm(value: FormConfig | null) {
        if (value) {
            let field: FormlyFieldConfig = {
                type: 'sections',
                className: 'section-class',
                fieldGroup: []
            };
            console.log('preview change', value);
            //this.form = cloneDeep(value);
            value.sections.forEach((section) => {
                field.fieldGroup?.push({
                    props: {
                        label: section.title,
                        description: section.description
                    },
                    fieldGroup: section.rows.reduce((acc, row) => {
                        if (row.fieldGroup.length > 0) {
                            const formlyRow: FormlyFieldConfig = {
                                fieldGroupClassName: row.fieldGroupClassName,
                                fieldGroup: row.fieldGroup.map((field, index) => ({
                                    ...field.option,
                                    key: field.option?.key ?? `field_${row.ffw_key}_${index}`
                                }))
                            };
                            acc.push(formlyRow);
                        }
                        return acc;
                    }, [] as FormlyFieldConfig[])
                });
            });

            this.fields.push(field);
        }
    }
    @Input() model!: any;

    @Output() model_emit = new EventEmitter();

    constructor() {}

    ngOnInit() {}
    ngOnDestroy(): void {}
}
