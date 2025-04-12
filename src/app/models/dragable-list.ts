import { v4 as uuidv4 } from 'uuid';
import { FormlyFieldConfig } from '@ngx-formly/core';

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

export interface FormConfig {
    key?: string;
    sections: FormSection[];
}

export interface FormSection {
    key?: string;
    index: string;
    title: string;
    description: string;
    row: FormlyFieldConfig[];
}

export function createNewFormSection(index: string): FormSection {
    return {
        key: uuidv4(),
        index: index,
        title: '',
        description: '',
        row: []
    } as FormSection;
}
