import { v4 as uuidv4 } from 'uuid';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ExternalExpr } from '@angular/compiler';
import { PrimeIcons } from 'primeng/api';

export interface DragableCategory {
    title: string;
    child: DragableItem[];
    type: string;
}

export interface DragableItem {
    title: string;
    icon: string;
    type: string;
    group?: string;
    actionable?: boolean; //maybe needs a rename
    properties?:
        | []
        | [DragableItemProperty]
        | [DragableItemProperty, DragableItemProperty]
        | [DragableItemProperty, DragableItemProperty, DragableItemProperty];
}

export interface DragableItemProperty extends FormlyFieldConfig {}

export const DRAGABLE_LIST: DragableCategory[] = [
    {
        type: 'section',
        title: 'Layout',
        child: [
            { title: 'Section', icon: PrimeIcons.TH_LARGE, type: 'section' },
            { title: 'Row', icon: PrimeIcons.MINUS_CIRCLE, type: 'row' }
        ]
    },
    {
        type: 'custom',
        title: 'Custom Fields',
        child: [
            {
                title: 'Text Input',
                icon: PrimeIcons.PENCIL,
                type: 'text-input',
                properties: [
                    {
                        key: 'text-input',
                        type: 'input',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Input',
                            placeholder: 'Placeholder',
                            description: 'Description'
                        }
                    }
                ]
            },
            {
                title: 'Textarea',
                icon: PrimeIcons.ALIGN_LEFT,
                type: 'textarea',
                properties: [
                    {
                        key: 'textarea',
                        type: 'textarea',
                        className: 'ffb-field-default',
                        props: {
                            label: 'TextArea',
                            placeholder: 'Placeholder',
                            description: 'Description'
                        }
                    }
                ]
            },
            {
                title: 'Checkbox',
                icon: PrimeIcons.CHECK_SQUARE,
                type: 'checkbox',
                properties: [
                    {
                        key: 'checkbox',
                        type: 'checkbox',
                        className: 'ffb-field-checkbox',
                        props: { label: 'Checkbox Label' }
                    }
                ]
            },
            {
                title: 'Dropdown',
                icon: PrimeIcons.CHEVRON_DOWN,
                type: 'dropdown',
                properties: [
                    {
                        key: 'dropdown',
                        type: 'select',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Select',
                            placeholder: 'Placeholder',
                            description: 'Description'
                        }
                    }
                ]
            },
            {
                title: 'Date Picker',
                icon: PrimeIcons.CALENDAR,
                type: 'date-picker',
                properties: [
                    {
                        key: 'date-picker',
                        type: 'datepicker',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Select Date',
                            placeholder: 'dd/mm/yyyy',
                            description: 'Pick a date for your record',
                            showIcon: true,
                            dateFormat: 'dd/mm/yy'
                        }
                    }
                ]
            },
            { title: 'File Upload', icon: PrimeIcons.UPLOAD, type: 'file-upload' }
        ]
    },
    {
        type: 'locked',
        title: 'Preset Fields',
        child: [
            {
                title: 'Investor Title',
                icon: PrimeIcons.USER,
                type: 'ffb-investor-title',
                properties: [
                    {
                        key: 'title',
                        type: 'select',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Title',
                            placeholder: 'e.g. Mr,Mrs,Miss',
                            description: "Person's title",
                            required: true
                        }
                    }
                ]
            },
            {
                title: 'Investor Names',
                icon: PrimeIcons.USER,
                type: 'name',
                properties: [
                    {
                        key: 'first_name',
                        type: 'input',
                        className: 'ffb-field-default',
                        props: {
                            label: 'First Name',
                            placeholder: 'First Name',
                            description: 'Person first name',
                            required: true
                        }
                    },
                    {
                        key: 'middle_name',
                        type: 'input',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Middle Name',
                            placeholder: 'Middle Name',
                            description: 'Person middle name'
                        }
                    },
                    {
                        key: 'last_name',
                        type: 'input',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Last Name',
                            placeholder: 'Last Name',
                            description: 'Person last name',
                            required: true
                        }
                    }
                ]
            },

            {
                title: 'Res.FullAdr',
                icon: PrimeIcons.HOME,
                type: 'ffb-investor-country',
                properties: [
                    {
                        key: 'country',
                        type: 'select',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Country',
                            placeholder: 'e.g. Australia',
                            description: '',
                            required: true
                        }
                    },
                    {
                        key: 'long_address',
                        type: 'input',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Residential Address',
                            placeholder: 'e.g. 112 Collins Street',
                            description: '',
                            required: true
                        }
                    }
                ]
            },
            {
                title: 'Res.AdrLine',
                icon: PrimeIcons.HOME,
                type: 'ffb-investor-adrline',
                properties: [
                    {
                        key: 'address_line_one',
                        type: 'input',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Address Line 1',
                            placeholder: 'e.g. Unit 131/55 Collins St',
                            description: '',
                            required: false
                        }
                    },
                    {
                        key: 'address_line_two',
                        type: 'input',
                        className: 'ffb-field-default',
                        props: {
                            label: 'Address Line 2',
                            placeholder: 'e.g. Melbourne VIC 3000',
                            description: '',
                            required: false
                        }
                    }
                ]
            }
        ]
    }
];

export enum DragTitleEnum {
    Section = 'section',
    Row = 'row',
    TEXT_INPUT = 'text-input',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    DROPDOWN = 'dropdown',
    DATE_PICKER = 'date-picker',
    FILE_UPLOAD = 'file-upload',
    FFB_NAME = 'ffb-name',
    FFB_DATE = 'ffb-date'
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

//should rework this interface into a class or create a common function to turn formField into formlyFieldConfig
export interface FormField extends BaseConfig {
    type: any;
    actions: {
        hide: FormFieldAction[];
        show: FormFieldAction[];
        required: FormFieldAction[];
        clear: FormFieldAction[];
        validator: FormFieldAction[];
        group: FormFieldAction[];
        filter: FormFieldAction[];
    };
    option: FormlyFieldConfig;
}

export interface FormFieldAction {
    ffw_key: string;
    key: string;
    type: string;
    value?: any;
    group: string;
}

export function createNewFormSection(index: number): FormSection {
    return {
        ffw_key: uuidv4(),
        index: index,
        title: `Please add a title`,
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
