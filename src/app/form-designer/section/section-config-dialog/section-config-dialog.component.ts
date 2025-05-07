import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { validate } from 'uuid';
import { FormSection } from '../../../models/dragable-list';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-section-config-dialog',
    template: `
        <form class="tw-flex tw-flex-col tw-gap-4" [formGroup]="form" (ngSubmit)="submit()">
            <div class="tw-flex tw-flex-col tw-gap-2">
                <label for="section-title">Section Title *</label>
                <input
                    pInputText
                    formControlName="title"
                    id="section-title"
                    aria-label="Section Title"
                    data-testid="sectionconfigdialog.title"
                />
            </div>
            <div class="tw-flex tw-flex-col tw-gap-2">
                <label for="section-description">Section Description *</label>
                <p-editor
                    formControlName="description"
                    id="section-description"
                    [modules]="modules"
                    [style]="{ height: '320px' }"
                    aria-label="Section Description"
                    data-testid="sectionconfigdialog.description"
                    ><ng-template pTemplate="header"> </ng-template
                ></p-editor>
            </div>
            <div class="tw-flex tw-flex-col tw-gap-2">
                <p-button
                    label="Submit"
                    type="submit"
                    data-testid="sectionconfigdialog.submit"
                    aria-label="Section Submit"
                />
            </div>
        </form>
    `,
    styleUrl: './section-config-dialog.component.scss'
})
export class SectionConfigDialogComponent implements OnInit, OnDestroy {
    data!: FormSection;
    form!: FormGroup;
    quillFormats = [
        'background',
        'bold',
        'color',
        'code',
        'italic',
        'link',
        'size',
        'strike',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
        'direction',
        'block'
    ];

    modules = {
        toolbar: this.quillFormats
    };
    constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private fb: FormBuilder) {
        console.log(this.config.data);
        this.data = this.config.data;
        this.form = this.fb.group({
            title: [this.data.title || '', Validators.required],
            description: [this.data.description || '', Validators.required]
        });
    }

    ngOnInit(): void {}

    submit(): void {
        if (!this.form.valid) return;
        this.ref.close(this.form.value);
    }

    ngOnDestroy(): void {}
}
