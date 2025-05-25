import { ChangeDetectionStrategy, Component } from '@angular/core';
import { extend } from 'lodash';
import { BaseFieldConfig } from '../base-field-config';

@Component({
    selector: 'ffb-base-field-config-shell',
    templateUrl: './base-field-config-shell.component.html',
    styleUrl: './base-field-config-shell.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseFieldConfigShellComponent extends BaseFieldConfig {
    addAction(data: [any, string]): void {
        this.add.emit([data[0], data[1]]);
    }

    removeAction(data: [any, string]): void {
        this.remove.emit([data[0], data[1]]);
    }

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
            case 'section':
                return 'Section';
            default:
                return 'N/A';
        }
    }
}
