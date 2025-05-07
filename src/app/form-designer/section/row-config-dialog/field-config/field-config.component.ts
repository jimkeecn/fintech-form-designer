import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ffb-field-config',
    template: `
        @if(form){
        <form class="tw-flex tw-flex-col tw-gap-2" [formGroup]="form">
            @if(isMeta){
            <div class="tw-flex tw-flex-col tw-gap-2">
                <label [for]="'key_' + ffw_key">Key</label>
                <input
                    pInputText
                    [id]="'key_' + ffw_key"
                    aria-describedby="label"
                    formControlName="key"
                    data-testid="FieldConfigComponent.key"
                />
            </div>
            }

            <div class="tw-flex tw-flex-col tw-gap-2">
                <label [for]="'label_' + ffw_key">Label</label>
                <input
                    pInputText
                    [id]="'label_' + ffw_key"
                    aria-describedby="label"
                    formControlName="label"
                    data-testid="FieldConfigComponent.label"
                />
            </div>
            <div class="tw-flex tw-flex-col tw-gap-2">
                <label [for]="'placeholder_' + ffw_key">Placeholder</label>
                <input
                    pInputText
                    [id]="'placeholder_' + ffw_key"
                    aria-describedby="placeholder"
                    formControlName="placeholder"
                    data-testid="FieldConfigComponent.placeholder"
                />
            </div>
        </form>
        }
    `,
    styleUrl: './field-config.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldConfigComponent implements OnInit, OnDestroy {
    @Input() form!: FormGroup | undefined;
    @Input() ffw_key!: string;
    @Input() isMeta!: boolean;
    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
