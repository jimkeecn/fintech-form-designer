export interface DragableCategory {
    title: string;
    child: DragableItem[];
}

export interface DragableItem {
    title: string;
    icon: string;
}

export const DRAGABLE_LIST: DragableCategory[] = [
    {
        title: 'Basic Fields',
        child: [
            { title: 'Text Input', icon: 'pi pi-pencil' },
            { title: 'Textarea', icon: 'pi pi-align-left' },
            { title: 'Checkbox', icon: 'pi pi-check-square' }
        ]
    },
    {
        title: 'Advanced Fields',
        child: [
            { title: 'Dropdown', icon: 'pi pi-list' },
            { title: 'Date Picker', icon: 'pi pi-calendar' },
            { title: 'File Upload', icon: 'pi pi-upload' }
        ]
    }
];
