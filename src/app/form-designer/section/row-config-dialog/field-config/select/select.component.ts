import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseFieldConfig } from '../shared/base-field-config';
import { SchemaObject } from '../../../../../models/dragable-list';
import { cloneDeep } from 'lodash';

export enum ActionCondition {
    In = 'in', // source includes any of target
    NotIn = '!in', // source does NOT include any of target
    IncludesAll = 'includesAll', // source includes ALL of target
    ExcludesAll = 'excludesAll', // source includes NONE of target
    IncludesAny = 'includesAny', // source includes AT LEAST ONE of target (same as In)
    Equals = 'equals', // source and target arrays are exactly equal
    NotEquals = 'notEquals', // source and target arrays are not equal
    IsEmpty = 'isEmpty', // source array is empty
    IsNotEmpty = 'isNotEmpty', // source array is not empty
    ContainsExactly = 'containsExactly' // source has exact same elements, order doesn't matter
}

/***
 * There is a problem with the primeng multiselection , when the object of datasource has key property as 'value'
 * It will automatically pick up the value of the property 'value' such as { id:1, value:'Australia' },
 * instead of picking up the whole object, it will pick the 'Australia'.
 */
@Component({
    selector: 'ffw-select-config',
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends BaseFieldConfig implements OnInit {
    @Input() datasource: any[] = [];
    @Input() dataScheme!: SchemaObject;
    filteredDataSource: any[] = [];
    conditions: any[] = [
        {
            key: ActionCondition.In,
            label: 'In'
        },
        {
            key: ActionCondition.NotIn,
            label: 'Not Within'
        }
    ];
    selectCondition: any;
    addAction(data: [any, string]): void {
        data[0].condition = this.selectCondition;
        data[0].sourceValue = cloneDeep(this.filteredDataSource);
        data[0].targetValue = [];
        this.filteredDataSource = [];
        this.selectCondition = null;
        this.add.emit([data[0], data[1]]);
    }

    removeAction(data: [any, string]): void {
        this.remove.emit([data[0], data[1]]);
    }

    getConditionLabel(key: string) {
        return this.conditions.filter((x) => x.key === key)[0]
            ? this.conditions.filter((x) => x.key === key)[0].label
            : 'N/A';
    }

    ngOnInit(): void {}

    onConditionChange(value: any) {}

    onMultipleSelectChange(value: any) {}
}
