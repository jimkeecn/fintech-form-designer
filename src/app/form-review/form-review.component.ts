import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormConfig } from '../models/dragable-list';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'ffw-form-review',
    templateUrl: './form-review.component.html',
    styleUrl: './form-review.component.scss'
})
export class FormReviewComponent implements OnInit, OnDestroy {
    private _ffw_key!: string | undefined;
    form!: FormConfig;
    @Input()
    set setForm(value: FormConfig | null) {
        if (value) {
            console.log('preview change', value);
            this.form = cloneDeep(value);
            this._ffw_key = value.ffw_key;
        }
    }
    @Input() model!: any;

    @Output() model_emit = new EventEmitter();

    constructor() {}

    ngOnInit() {}
    ngOnDestroy(): void {}
}
