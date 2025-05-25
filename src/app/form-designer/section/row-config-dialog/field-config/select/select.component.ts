import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseFieldConfig } from '../shared/base-field-config';

@Component({
    selector: 'ffw-select-config',
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends BaseFieldConfig {
    addAction(data: [any, string]): void {
        this.add.emit([data[0], data[1]]);
    }

    removeAction(data: [any, string]): void {
        this.remove.emit([data[0], data[1]]);
    }
}
