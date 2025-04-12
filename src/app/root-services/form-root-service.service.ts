import { Injectable } from '@angular/core';
import { createNewFormSection, FormConfig } from '../models/dragable-list';
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
            key: uuidv4(),
            sections: []
        } as FormConfig;
    }

    addNewSection() {
        const form = { ...this._form.value };
        const newSection = createNewFormSection(form.sections.length);
        form.sections?.push(newSection);
        this._form.next(form);
        if (newSection.key) this.addOptionConenctTo(newSection.key);
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

    get form$(): Observable<FormConfig> {
        return this._form.asObservable();
    }

    get optionConnectTo(): Observable<string[]> {
        return this._optionConnectTo.asObservable();
    }
}
