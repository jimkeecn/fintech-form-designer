import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { createNewFormSection, DragableItem, DragTitleEnum } from '../../../models/dragable-list';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
    selector: 'ffb-section-drop-area',
    templateUrl: './drop-area.component.html',
    styleUrl: './drop-area.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropAreaComponent {
    @Output() entered = new EventEmitter();
    @Output() dropped = new EventEmitter();

    defaultMessageShown: boolean = true;
    isDraggingOver = false;
    sectionPredict = (drag: CdkDrag, drop: CdkDropList): boolean => {
        const data = drag.data as DragableItem;
        return data.key === DragTitleEnum.Section;
    };

    drop($event: any) {
        this.isDraggingOver = false;
        this.dropped.emit(createNewFormSection('0'));
    }
}
