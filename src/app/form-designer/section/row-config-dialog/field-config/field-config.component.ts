import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormSection } from '../../../../models/dragable-list';
import { FormVariablesService } from '../../../../root-services/form-variables.service';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

enum ActionableEnum {
    CheckBox = 'checkbox',
    Select = 'select',
    Toggle = 'toggle'
}

enum ActionEnum {
    Hide = 'hide',
    Show = 'show',
    Required = 'required',
    Clear = 'clear',
    Validator = 'validator',
    Group = 'group',
    Filter = 'filter'
}

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
    @Input() currentSection!: FormSection;
    action_list = [
        ActionEnum.Hide,
        ActionEnum.Show,
        ActionEnum.Required,
        ActionEnum.Clear,
        ActionEnum.Validator,
        ActionEnum.Group,
        ActionEnum.Filter
    ] as string[];
    actionable_list = [ActionableEnum.CheckBox, ActionableEnum.Select, ActionableEnum.Toggle];
    example_mapping = ['Investor FirstName', 'Investor Last', 'Investor DOB', 'Investor Mobile'];
    actionEnum = ActionEnum;
    /**
     *  dropdown values after user select the data source.
     */
    datasource: any[] = [];
    dataScheme: any;

    private _destory$ = new Subject<any>();

    schemes: any[] = [];

    returnHideForm(action: string): FormGroup {
        return this.form?.get(action) as FormGroup;
    }
    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private formVarService: FormVariablesService
    ) {}

    ngOnInit(): void {
        console.log(this.fieldType);
        this.formVarService.variablesSchema$.pipe(takeUntil(this._destory$)).subscribe((schemes) => {
            this.schemes = schemes;
        });
        (this.form?.get('selectedScheme') as FormControl).valueChanges
            .pipe(takeUntil(this._destory$), distinctUntilChanged())
            .subscribe((value) => {
                if (value) {
                    this.datasource = this.formVarService.retrieveVariableValue(value?.name);
                    this.dataScheme = value;
                }
                //Need to add logic to check action, if there are actions already. changing selectedScheme will remove all the actions.
            });
    }

    ngOnDestroy(): void {
        this._destory$.unsubscribe();
    }

    addAction(data: [any, string]) {
        const field = data[0];
        const action = data[1];
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
            sourceValue: [field.sourceValue ?? []],
            targetValue: [field.targetValue ?? []],
            parentSection: this.currentSection.key,
            condition: [field.condition ?? null]
        });
        actionArray.push(form);
    }

    removeAction(data: [any, string]) {
        const field = data[0];
        const action = data[1];
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
            const typed = type as ActionableEnum;
            if (this.actionable_list.includes(typed)) {
                if (typed === ActionableEnum.Select) {
                    if ((this.form?.get('selectedScheme') as FormControl).value) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (typed === ActionableEnum.CheckBox) {
                    return true;
                } else if (typed === ActionableEnum.Toggle) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }
}
