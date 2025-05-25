import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive() // Important: allows Angular to recognize the class in component inheritance
export abstract class BaseFieldConfig {
    @Input() form!: FormGroup;
    @Input() action!: string;
    @Input() allFields!: { key: string; value: any }[];

    @Output() add = new EventEmitter<[any, string]>();
    @Output() remove = new EventEmitter<[any, string]>();

    abstract addAction(data: [any, string]): void;
    abstract removeAction(data: [any, string]): void;
}
