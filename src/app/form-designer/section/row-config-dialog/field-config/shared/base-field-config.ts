import { EventEmitter, Input, Output, Directive, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive() // Important: allows Angular to recognize the class in component inheritance
export abstract class BaseFieldConfig implements OnDestroy {
    protected _destroy$ = new Subject<void>();

    @Input() form!: FormGroup;
    @Input() action!: string;
    @Input() allFields!: { key: string; value: any }[];

    @Output() add = new EventEmitter<[any, string]>();
    @Output() remove = new EventEmitter<[any, string]>();

    abstract addAction(data: [any, string]): void;
    abstract removeAction(data: [any, string]): void;

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
