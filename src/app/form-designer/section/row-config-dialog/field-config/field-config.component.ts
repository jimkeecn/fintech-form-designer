import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'ffb-field-config',
    templateUrl: './field-config.component.html',
    styleUrl: './field-config.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldConfigComponent implements OnInit, OnDestroy {
    @Input() form!: FormGroup | undefined;
    @Input() ffw_key!: string;
    @Input() fields!: any[];
    @Input() allFields!: { key: string; value: any }[];
    @Input() fieldType!: string | undefined;
    action_list = ['hide', 'show', 'required', 'clear', 'validator', 'group', 'filter'];
    actionable_list = ['checkbox', 'select', 'toggle'];
    example_mapping = ['Investor FirstName', 'Investor Last', 'Investor DOB', 'Investor Mobile'];
    constructor(private fb: FormBuilder, private messageService: MessageService) {}

    ngOnInit(): void {
        console.log(this.fieldType);
    }

    ngOnDestroy(): void {}

    fieldTypeMapper(type: string): string {
        switch (type) {
            case 'input':
                return 'Text';
            case 'textarea':
                return 'Multiline';
            case 'checkbox':
                return 'Checkbox';
            case 'radio':
                return 'Radio Buttons';
            case 'select':
                return 'Dropdown';
            case 'date':
                return 'Date Picker';
            case 'number':
                return 'Number';
            case 'toggle':
                return 'Toggle Switch';
            case 'password':
                return 'Password';
            default:
                return type;
        }
    }

    addAction(field: any, action: string) {
        if (!this.form) return;
        const actionArray = this.form.get([action, 'actions']) as FormArray;
        if (actionArray.value.find((x: any) => x.ffw_key === field.key)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Duplicate',
                detail: 'This field is already in the list.'
            });
            return;
        }
        const form = this.fb.group({
            type: [field.value.type],
            ffw_key: [field.key],
            key: [field.value.key],
            group: [action],
            value: []
        });
        actionArray.push(form);
    }

    removeAction(field: any, action: string) {
        if (!this.form) return;

        const actionArray = this.form.get([action, 'actions']) as FormArray;
        if (!actionArray) return;

        const index = actionArray.controls.findIndex((ctrl) => ctrl.value.ffw_key === field.ffw_key);
        if (index !== -1) {
            actionArray.removeAt(index);
        }
    }

    getActionable(type: string | undefined): boolean {
        if (type) {
            return this.actionable_list.includes(type);
        } else {
            return false;
        }
    }
}
