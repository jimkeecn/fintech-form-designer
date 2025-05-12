import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormField, FormRow, FormSection } from '../../../models/dragable-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRowConfigDialogClose, RowConfigDialogCloseEnum } from './row-config-dialog';
import { cloneDeep } from 'lodash';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormRootService } from '../../../root-services/form-root-service.service';

@Component({
    selector: 'app-row-config-dialog',
    templateUrl: './row-config-dialog.component.html',
    styleUrl: './row-config-dialog.component.scss',
    animations: [
        trigger('fadeTab', [
            transition(':enter', [style({ opacity: 0 }), animate('200ms ease-in', style({ opacity: 1 }))])
        ])
    ]
})
export class RowConfigDialogComponent implements OnInit, OnDestroy {
    tabIndex: number = 0;
    row!: FormRow;
    result!: IRowConfigDialogClose;
    form: any;
    fieldIndex: number = 0;
    field: FormField;
    flattenFields: { key: string; value: any }[];
    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private fb: FormBuilder,
        private rootService: FormRootService
    ) {
        this.row = cloneDeep(this.config.data.row);
        this.fieldIndex = this.config.data.index;
        this.field = this.row.fieldGroup[this.fieldIndex];
        const allFields = Array.from(this.rootService.getFlattenFields() as Map<any, any>).map(([key, value]) => ({
            key,
            value
        }));

        this.flattenFields = allFields.filter((f) => f.key !== this.field.ffw_key && f.value.option.key !== '');
        console.log('get flatten', this.flattenFields);

        this.form = this.fb.group({
            label: [this.field.option.props?.label, Validators.required],
            placeholder: [this.field.option.props?.placeholder],
            key: [this.field.option.key, Validators.required],
            hide: this.fb.group({
                selectedField: [null],
                actions: this.fb.array(this.field.actions.hide)
            }),
            show: this.fb.group({
                selectedField: [null],
                actions: this.fb.array(this.field.actions.show)
            }),
            required: this.fb.group({
                selectedField: [null],
                actions: this.fb.array(this.field.actions.required)
            }),
            clear: this.fb.group({
                selectedField: [null],
                actions: this.fb.array(this.field.actions.clear)
            }),
            validator: this.fb.group({
                selectedField: [null],
                actions: this.fb.array(this.field.actions.validator)
            }),
            group: this.fb.group({
                selectedField: [null],
                actions: this.fb.array(this.field.actions.group)
            }),
            filter: this.fb.group({
                selectedField: [null],
                actions: this.fb.array(this.field.actions.filter)
            })
        });
    }

    update() {
        this.form.markAllAsTouched();
        this.form.markAsDirty();
        if (this.form.valid) {
            this.formMapper();
            this.ref.close(cloneDeep(this.row));
        }
    }

    formMapper() {
        this.row.fieldGroup.forEach((field, i) => {
            if (i === this.fieldIndex) {
                const { label, key, placeholder, hide, show, required, clear, validator, group, filter } =
                    this.form.value;
                field.option.props = {
                    ...field.option.props,
                    label,
                    placeholder,
                    key
                };
                field.option.key = key;
                field.actions.hide = hide.actions;
                field.actions.show = show.actions;
                field.actions.required = required.actions;
                field.actions.clear = clear.actions;
                field.actions.validator = validator.actions;
                field.actions.group = group.actions;
                field.actions.filter = filter.actions;
            }
        });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
