import { v4 as uuidv4 } from 'uuid';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ExternalExpr } from '@angular/compiler';

export interface DragableCategory {
    title: string;
    child: DragableItem[];
    key: string;
}

export interface DragableItem {
    title: string;
    icon: string;
    key: string;
    properties?: any;
}

export const DRAGABLE_LIST: DragableCategory[] = [
    {
        key: 'section',
        title: 'Layout',
        child: [
            { title: 'Section', icon: 'pi pi-th-large', key: 'section' },
            { title: 'Row', icon: 'pi pi-minus', key: 'row' }
        ]
    },
    {
        key: 'basic',
        title: 'Basic Fields',
        child: [
            { title: 'Text Input', icon: 'pi pi-pencil', key: 'text-input' },
            { title: 'Textarea', icon: 'pi pi-align-left', key: 'textarea' },
            { title: 'Checkbox', icon: 'pi pi-check-square', key: 'checkbox' },
            { title: 'Dropdown', icon: 'pi pi-chevron-down', key: 'dropdown' },
            { title: 'Date Picker', icon: 'pi pi-calendar', key: 'date-picker' },
            { title: 'File Upload', icon: 'pi pi-upload', key: 'file-upload' }
        ]
    },
    {
        key: 'advanced',
        title: 'Advanced Fields',
        child: []
    }
];

export enum DragTitleEnum {
    Section = 'section',
    Row = 'row'
}

export interface BaseConfig {
    isDraggingOver?: boolean;
}

export interface FormConfig {
    key?: string;
    sections: FormSection[];
}

export interface FormSection extends BaseConfig {
    key?: string;
    index: number;
    title: string;
    description: string;
    row: FormRow[];
}

export interface FormRow extends FormlyFieldConfig {
    ffb_isDraggingOver: boolean;
    ffb_index: number;
}

export function createNewFormSection(index: number): FormSection {
    return {
        key: uuidv4(),
        index: index,
        title: 'Please add a title',
        description: `<p class="tw-text-gray-700 tw-text-sm">
                    <strong>Tip:</strong> Add a brief description of this section to help users understand its purpose. You can include instructions, context, or any notes that clarify what information should be provided here.
                    </p>`,
        row: []
    } as FormSection;
}
