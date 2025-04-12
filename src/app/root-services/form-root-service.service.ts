import { Injectable } from '@angular/core';
import { createNewFormSection, FormConfig, FormSection } from '../models/dragable-list';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class FormRootService {
    private _form = new BehaviorSubject<FormConfig>(this.initForm());
    private _optionConnectTo = new BehaviorSubject<string[]>([
        'ffb-default-section-drop-area',
        'ffb-default-section-row-drop-area'
    ]);

    constructor() {}

    initForm() {
        return {
            ffw_key: uuidv4(),
            sections: []
        } as FormConfig;
    }

    addNewSection() {
        const form = { ...this._form.value };
        const newSection = createNewFormSection(form.sections.length);
        form.sections?.push(newSection);
        this._form.next(form);
        if (newSection.ffw_key) this.addOptionConenctTo(newSection.ffw_key);
    }

    swapSection(sections: any[]) {
        if (sections.length == 0) return;
        const form = { ...this._form.value };
        sections.forEach((section, index) => {
            section.index = index;
        });
        form.sections = sections;
        this._form.next(form);
    }

    addOptionConenctTo(id: string) {
        if (!id) return;
        const values = [...this._optionConnectTo.value];
        values.push(id);
        this._optionConnectTo.next(values);
    }

    removeOptionConnectTo(id: string) {
        if (!id) return;

        const values = [...this._optionConnectTo.value];
        const index = values.findIndex((v) => v === id);

        if (index > -1) {
            values.splice(index, 1);
            this._optionConnectTo.next(values);
        }
    }

    private addOptionConenctToAsGroup(ids: string[]) {}

    /**
     *
     * @param section
     * first update section,
     * second update the connectTo id list so fields can be drag and drop
     * @returns
     */
    updateSection(section: FormSection): void {
        if (!section) return;
        const form = { ...this._form.value };
        form.sections.forEach((sec, i) => {
            if (sec.ffw_key == section.ffw_key) sec = section;
        });
        this._form.next(form);
        const ids: string[] = [];
        section.rows.forEach((sec) => {
            if (sec.ffw_key && sec.ffw_key.length > 0) ids.push(sec.ffw_key);
        });
        if (ids.length > 0) this.addOptionConenctToAsGroup(ids);
    }

    get form$(): Observable<FormConfig> {
        return this._form.asObservable();
    }

    get optionConnectTo(): Observable<string[]> {
        return this._optionConnectTo.asObservable();
    }
}
