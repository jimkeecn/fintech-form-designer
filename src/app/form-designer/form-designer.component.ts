import { Component, OnInit } from '@angular/core';
import { FormRootService } from '../root-services/form-root-service.service';
import { DragableItem, DragTitleEnum } from '../models/dragable-list';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'ffb-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrl: './form-designer.component.scss'
})
export class FormDesignerComponent implements OnInit {
    sectionList: any[] = [];

    sectionEmit() {
        this.formService.addNewSection();
    }

    constructor(public formService: FormRootService) {}

    ngOnInit(): void {
        this.formService.form$.subscribe((x) => {
            this.sectionList = x.sections;
            console.log('value changed', x);
        });
    }

    swapSection(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.sectionList, event.previousIndex, event.currentIndex);
        this.formService.swapSection(this.sectionList);
    }
}
