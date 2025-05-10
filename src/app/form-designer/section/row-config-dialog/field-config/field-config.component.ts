import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ffb-field-config',
    template: `
        @if(form){
        <form [formGroup]="form">
            <p-accordion [activeIndex]="0">
                <p-accordionTab header="Basic Configuration">
                    <div class="tw-flex tw-flex-col tw-gap-2">
                        <label [for]="'key_' + ffw_key">Key</label>
                        <input
                            pInputText
                            [id]="'key_' + ffw_key"
                            aria-describedby="label"
                            formControlName="key"
                            data-testid="FieldConfigComponent.key"
                        />
                        <small [id]="'key_' + ffw_key + '_help'"> Change to your corresponding json attribute </small>
                    </div>

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
                </p-accordionTab>
                <p-accordionTab header="Advanced Configuration"> </p-accordionTab>
            </p-accordion>
        </form>
        }
    `,
    styleUrl: './field-config.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldConfigComponent implements OnInit, OnDestroy {
    @Input() form!: FormGroup | undefined;
    @Input() ffw_key!: string;
    @Input() fields!: any[];
    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}
