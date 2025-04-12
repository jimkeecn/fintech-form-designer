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
        child: [{ title: 'Section', icon: 'pi pi-th-large', key: 'section' }]
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
