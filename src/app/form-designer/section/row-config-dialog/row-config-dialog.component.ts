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
    data!: FormRow;
    result!: IRowConfigDialogClose;
    formMap = new Map<string, FormGroup>();
    constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private fb: FormBuilder) {
        this.data = cloneDeep(this.config.data);
        this.data.fieldGroup.forEach((field, i) => {
            const form = this.fb.group({
                label: [field.option.props?.label, Validators.required],
                placeholder: [field.option.props?.placeholder]
            });
            this.formMap.set(`${field.ffw_key}_${i}`, form);
        });
    }

    removeField(index: number, key: string) {
        this.data.fieldGroup.splice(index, 1);
        this.formMap.delete(key);
    }

    update() {
        let allValid = true;
        this.formMap.forEach((formGroup, key) => {
            formGroup.markAllAsTouched();
            formGroup.markAsDirty();
            if (formGroup.invalid) {
                allValid = false;
            }
        });
        if (allValid) {
            this.formMapper();
            this.ref.close(this.data);
        }
    }

    formMapper() {
        this.data.fieldGroup.forEach((field, i) => {
            const formValue = this.formMap.get(`${field.ffw_key}_${i}`)?.value;
            field.option.props = {
                ...field.option.props,
                label: formValue.label,
                placeholder: formValue.placeholder
            };
        });
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
