import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormConfig } from '../models/dragable-list';
import { cloneDeep } from 'lodash';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
    selector: 'ffw-form-review',
    templateUrl: './form-review.component.html',
    styleUrl: './form-review.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormReviewComponent implements OnInit, OnDestroy {
    fields: FormlyFieldConfig[] = [];
    form = new FormGroup({});
    @Input()
    set setForm(value: FormConfig | null) {
        if (value) {
            const flatActions = value.sections.flatMap((section) => {
                return section.rows.flatMap((row) => {
                    return row.fieldGroup.flatMap((field) => {
                        return Object.values(field.actions).flatMap((actionArray) => {
                            return actionArray.map((action) => {
                                return {
                                    ...action,
                                    parentKey: field.option.key
                                };
                            });
                        });
                    });
                });
            });

            const getExpress = (key: any, sectionKey: any) => {
                console.log('express key', key);
                const foundActions = flatActions.filter((action) => action.key === key);
                const expression: any = {};
                foundActions.forEach((action) => {
                    if (action.group === 'hide') {
                        expression['hide'] = `!!model?.${sectionKey}?.${action.parentKey}`;
                    }
                });
                console.log('express', expression);
                return expression;
            };

            console.log('flatActions', flatActions);

            let field: FormlyFieldConfig = {
                type: 'sections',
                className: 'section-class',
                fieldGroup: []
            };
            //this.form = cloneDeep(value);
            value.sections.forEach((section) => {
                if (section.key) this.model[section.key] = {};
                field.fieldGroup?.push({
                    key: section.key,
                    type: '', //will need to implement the 'repeat-section' wrapper
                    props: {
                        label: section.title,
                        description: section.description
                    },
                    expressions: getExpress(section.key, section.key),
                    fieldGroup: section.rows.reduce((acc, row) => {
                        if (row.fieldGroup.length > 0) {
                            const formlyRow: FormlyFieldConfig = {
                                fieldGroupClassName: row.fieldGroupClassName,
                                fieldGroup: row.fieldGroup.map((field, index) => {
                                    const fieldKey = field.option?.key;
                                    if (section.key) {
                                        if (fieldKey && typeof fieldKey === 'string')
                                            this.model[section.key][fieldKey] = null;
                                    }
                                    return {
                                        ...field.option,
                                        key: fieldKey,
                                        expressions: getExpress(fieldKey, section.key)
                                    };
                                })
                            };
                            acc.push(formlyRow);
                        }
                        return acc;
                    }, [] as FormlyFieldConfig[])
                });
            });

            this.fields.push(field);
            console.log(this.fields, this.model);
        }
    }
    @Input() model: any = {};

    @Output() model_emit = new EventEmitter();

    constructor() {}

    ngOnInit() {}
    ngOnDestroy(): void {}

    submit() {
        console.log(this.form.value);
    }
}
