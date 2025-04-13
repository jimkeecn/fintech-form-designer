import { v4 as uuidv4 } from 'uuid';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ExternalExpr } from '@angular/compiler';

export interface DragableCategory {
    title: string;
    child: DragableItem[];
    ffw_key: string;
}

export interface DragableItem {
    title: string;
    icon: string;
    ffw_key: string;
    properties?: any;
}

export const DRAGABLE_LIST: DragableCategory[] = [
    {
        ffw_key: 'section',
        title: 'Layout',
        child: [
            { title: 'Section', icon: 'pi pi-th-large', ffw_key: 'section' },
            { title: 'Row', icon: 'pi pi-minus', ffw_key: 'row' }
        ]
    },
    {
        ffw_key: 'basic',
        title: 'Basic Fields',
        child: [
            { title: 'Text Input', icon: 'pi pi-pencil', ffw_key: 'text-input' },
            { title: 'Textarea', icon: 'pi pi-align-left', ffw_key: 'textarea' },
            { title: 'Checkbox', icon: 'pi pi-check-square', ffw_key: 'checkbox' },
            { title: 'Dropdown', icon: 'pi pi-chevron-down', ffw_key: 'dropdown' },
            { title: 'Date Picker', icon: 'pi pi-calendar', ffw_key: 'date-picker' },
            { title: 'File Upload', icon: 'pi pi-upload', ffw_key: 'file-upload' }
        ]
    },
    {
        ffw_key: 'advanced',
        title: 'Advanced Fields',
        child: []
    }
];

export const FIELD_OPTION_LIST: FormlyFieldConfig[] = [
    {
        key: 'text-input',
        type: 'input',
        props: {
            label: 'Input',
            placeholder: 'Placeholder',
            description: 'Description'
        }
    }
];

export enum DragTitleEnum {
    Section = 'section',
    Row = 'row',
    TEXT_INPUT = 'text-input'
}

export interface BaseConfig {
    ffw_key: string;
    ffw_index?: number;
    ffw_isDraggingOver?: boolean;
}

export interface FormConfig {
    ffw_key?: string;
    sections: FormSection[];
}

export interface FormSection extends BaseConfig {
    index: number;
    title: string;
    description: string;
    rows: FormRow[];
}

export interface FormRow extends BaseConfig {
    hasConfig?: boolean;
    fieldGroup: FormField[];
    fieldGroupClassName: string;
}

export interface FormField extends BaseConfig {
    option: FormlyFieldConfig;
}

export function createNewFormSection(index: number): FormSection {
    return {
        ffw_key: uuidv4(),
        index: index,
        title: `Please add a title + ${index.toString()}`,
        description: `<p class="tw-text-gray-700 tw-text-sm">
                    <strong>Tip:</strong> Add a brief description of this section to help users understand its purpose. You can include instructions, context, or any notes that clarify what information should be provided here.
                    </p>`,
        rows: []
    } as FormSection;
}

export function createNewRow(index: number): FormRow {
    return {
        ffw_key: uuidv4(),
        ffw_index: index,
        ffw_isDraggingOver: false,
        fieldGroupClassName: 'ffb-section-row',
        fieldGroup: [],
        hasConfig: false
    };
}
