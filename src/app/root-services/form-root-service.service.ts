import { Injectable } from '@angular/core';
import { createNewFormSection, DragTitleEnum, FormConfig, FormSection } from '../models/dragable-list';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep, values } from 'lodash';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
    providedIn: 'root'
})
export class FormRootService {
    fields: FormlyFieldConfig[] = [];
    private _formConfig$ = new BehaviorSubject<FormConfig>(this.initForm());
    private _optionConnectTo$ = new BehaviorSubject<string[]>([
        'ffb-default-section-drop-area',
        'ffb-default-section-row-drop-area'
    ]);

    isPreview$ = new BehaviorSubject<boolean>(false);

    constructor() {
        /**
         * Consider this approach if it hits any performance issue in review so we construct the fields for formly while designing
         * Otherwise, do not use the following flow.
         * deprecated soon
         */
        // this._formConfig$
        //     .asObservable()
        //     .pipe(
        //         debounceTime(200),
        //         distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        //         tap((value) => {
        //             this.fields = []; // Clear previous field config to prevent duplication
        //             this.buildFields(value);
        //         })
        //     )
        //     .subscribe(); // side-effect only, no need to store
    }

    initForm() {
        return {
            ffw_key: uuidv4(),
            sections: []
        } as FormConfig;
    }

    addNewSection() {
        const form = cloneDeep(this._formConfig$.value);
        const newSection = createNewFormSection(form.sections.length);
        form.sections?.push(newSection);
        this._formConfig$.next(form);
        if (newSection.ffw_key) this.addOptionConenctTo(newSection.ffw_key);
    }

    swapSection(sections: any[]) {
        if (sections.length == 0) return;
        const form = cloneDeep(this._formConfig$.value);
        sections.forEach((section, index) => {
            section.index = index;
        });
        form.sections = sections;
        this._formConfig$.next(form);
    }

    addOptionConenctTo(id: string) {
        if (!id) return;
        const values = [...this._optionConnectTo$.value];
        values.push(id);
        this._optionConnectTo$.next(values);
    }

    removeOptionConnectTo(id: string) {
        if (!id) return;

        const values = [...this._optionConnectTo$.value];
        const index = values.findIndex((v) => v === id);

        if (index > -1) {
            values.splice(index, 1);
            this._optionConnectTo$.next(values);
        }
    }

    private addOptionConenctToAsGroup(ids: string[]) {
        if (!ids?.length) return;

        const currentIds = new Set(this._optionConnectTo$.value);

        ids.forEach((id) => currentIds.add(id));

        this._optionConnectTo$.next(Array.from(currentIds));
    }

    private removeOptionConenctToAsGroup(ids: string[]) {
        if (!ids?.length) return;
        const currentIds = this._optionConnectTo$.value;
        ids.forEach((id) => {
            currentIds.splice(
                currentIds.findIndex((x) => x === id),
                1
            );
        });
        this._optionConnectTo$.next(currentIds);
    }

    /**
     *
     * @param section
     * first update section,
     * second update the connectTo id list so fields can be drag and drop
     * @returns
     */
    updateSection(section: FormSection): void {
        if (!section) return;
        const form = cloneDeep(this._formConfig$.value);
        form.sections.forEach((sec, i) => {
            if (sec.ffw_key == section.ffw_key) sec = section;
        });
        this._formConfig$.next(form);
        const ids: string[] = [];
        section.rows.forEach((sec) => {
            if (sec.ffw_key && sec.ffw_key.length > 0) ids.push(sec.ffw_key);
        });
        if (ids.length > 0) {
            this.addOptionConenctToAsGroup(ids);
            this.flattenFields();
        }
        console.log('update section', this._formConfig$.value);
    }

    deleteSection(sectionId: string): void {
        if (!sectionId) return;
        const form = cloneDeep(this._formConfig$.value);
        const section = form.sections.find((x) => x.ffw_key === sectionId);
        const ids: string[] = []; //ids that need to be removed
        if (!section) return;
        section.rows.forEach((sec) => {
            if (sec.ffw_key && sec.ffw_key.length > 0) ids.push(sec.ffw_key);
        });
        form.sections.splice(
            form.sections.findIndex((x) => x.ffw_key === sectionId),
            1
        );
        this._formConfig$.next(form);
        this.removeOptionConenctToAsGroup(ids);
    }

    get form$(): Observable<FormConfig> {
        return this._formConfig$.asObservable();
    }

    get optionConnectTo(): Observable<string[]> {
        return this._optionConnectTo$.asObservable();
    }

    /** Flatten Fields */
    private _flatten_fields = new Map<string, any>();

    private flattenFields() {
        const form = cloneDeep(this._formConfig$.value);

        const allFields = form.sections.flatMap((section) => {
            const sectionItem = {
                key: section.ffw_key,
                option: {
                    key: section.key,
                    type: DragTitleEnum.Section
                }
            };
            const fieldItem = section.rows.flatMap((row) =>
                row.fieldGroup.map((field) => ({
                    key: field.ffw_key as string,
                    option: field.option
                }))
            );
            return [sectionItem, ...fieldItem];
        });

        this._flatten_fields = new Map<string, any>();
        // Only assign if the key doesn't already exist
        for (const field of allFields) {
            if (field.key) {
                this._flatten_fields.set(field.key, field.option);
            }
        }
    }

    getFlattenFields() {
        return cloneDeep(this._flatten_fields);
    }

    //Build Flieds
    buildFields(value: FormConfig) {
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

        const getExpress = (key: any) => {
            const foundActions = flatActions.filter((action) => action.key === key);
            const expression: any = {};
            foundActions.forEach((action) => {
                if (action.group === 'hide') {
                    expression['hide'] = `model.${action.parentKey}`;
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
                                key: field.option?.key ?? `field_${row.ffw_key}_${index}`,
                                expressions: getExpress(field.option?.key)
                            }))
                        };
                        acc.push(formlyRow);
                    }
                    return acc;
                }, [] as FormlyFieldConfig[])
            });
        });

        this.fields.push(field);
        console.log(this.fields);
    }
}
