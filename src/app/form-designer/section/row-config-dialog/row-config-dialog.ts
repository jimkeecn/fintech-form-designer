import { FormRow } from '../../../models/dragable-list';

export enum RowConfigDialogCloseEnum {
    CLOSE = 'close',
    UPDATE = 'update',
    DELETE = 'delete'
}

export interface IRowConfigDialogClose {
    action: string;
    data: {
        index?: number;
        row?: FormRow;
    };
}
