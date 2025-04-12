import { Injectable } from '@angular/core';
import { createNewFormSection, FormConfig } from '../models/dragable-list';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class FormRootService {
    private _form = new BehaviorSubject<FormConfig>(this.initForm());

    constructor() {}

    initForm() {
        return {
            key: uuidv4(),
            sections: []
        } as FormConfig;
    }

    addNewSection() {
        const form = { ...this._form.value };

        form.sections?.push(createNewFormSection(form.sections.length));
        if (form.sections?.length > 0) {
            this._form.next(form);
        }
    }

    get form$(): Observable<FormConfig> {
        return this._form.asObservable();
    }
}
