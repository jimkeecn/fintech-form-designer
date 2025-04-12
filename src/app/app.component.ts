import { Component } from '@angular/core';
import { DRAGABLE_LIST, DragableItem, FormConfig } from './models/dragable-list';

//https://github.com/ngx-formly/ngx-formly/blob/main/src/core/src/lib/models/fieldconfig.ts

@Component({
    selector: 'ffb-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'fintech-form-buidler';
    form!: FormConfig;
    readonly DRAGABLE_LIST = DRAGABLE_LIST;

    initForm() {
        this.form = {
            key: 'abc',
            sections: []
        } as FormConfig;
    }
}
