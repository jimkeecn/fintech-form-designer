import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormRow, FormSection } from '../../../models/dragable-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IRowConfigDialogClose, RowConfigDialogCloseEnum } from './row-config-dialog';
import { cloneDeep } from 'lodash';
import { animate, style, transition, trigger } from '@angular/animations';

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
    field: any;
    constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private fb: FormBuilder) {
        console.log(config);
        this.row = cloneDeep(this.config.data.row);
        this.fieldIndex = this.config.data.index;
        this.field = this.row.fieldGroup[this.fieldIndex];
        this.form = this.fb.group({
            label: [this.field.option.props?.label, Validators.required],
            placeholder: [this.field.option.props?.placeholder],
            key: [this.field.option.key, Validators.required]
        });
    }

    update() {
        this.form.markAllAsTouched();
        this.form.markAsDirty();
        if (this.form.valid) {
            this.formMapper();
            this.ref.close(this.row);
        }
    }

    formMapper() {
        this.row.fieldGroup.forEach((field, i) => {
            if (i === this.fieldIndex) {
                const { label, key, placeholder } = this.form.value;
                field.option.props = {
                    ...field.option.props,
                    label,
                    placeholder,
                    key
                };
                field.option.key = key;
            }
        });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
