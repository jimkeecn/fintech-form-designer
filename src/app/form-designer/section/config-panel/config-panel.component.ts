import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragableItem, DragTitleEnum } from '../../../models/dragable-list';

@Component({
    selector: 'ffb-config-panel',
    templateUrl: './config-panel.component.html',
    styleUrl: './config-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigPanelComponent implements OnInit {
    @Input() section: any;
    @Input() sectionList: any[] = [];

    constructor() {}

    ngOnInit(): void {}

    rowEnterPredict = (drag: CdkDrag): boolean => {
        const data = drag.data as DragableItem;
        return data.key === DragTitleEnum.Row;
    };

    rowDropped(section: any, id?: string): void {
        section.isDraggingOver = false;

        console.log('row dropped', id);
    }
}
