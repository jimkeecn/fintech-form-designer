import { Component, OnInit } from '@angular/core';
import { FormRootService } from '../root-services/form-root-service.service';
import { DragableItem, DragTitleEnum } from '../models/dragable-list';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'ffb-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrl: './form-designer.component.scss'
})
export class FormDesignerComponent implements OnInit {
    sectionEmit() {
        this.formService.addNewSection();
    }

    constructor(public formService: FormRootService) {}

    ngOnInit(): void {
        this.formService.form$.subscribe((x) => {
            console.log(x);
        });
    }

    rowEnterPredict = (drag: CdkDrag): boolean => {
        const data = drag.data as DragableItem;
        return data.key === DragTitleEnum.Row;
    };

    rowDropped(section: any, id?: string): void {
        section.isDraggingOver = false;
        console.log('row dropped', id);
    }
}
