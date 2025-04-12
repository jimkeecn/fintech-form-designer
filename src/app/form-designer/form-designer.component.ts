import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormRootService } from '../root-services/form-root-service.service';
import { DragableItem, DragTitleEnum } from '../models/dragable-list';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'ffb-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrl: './form-designer.component.scss'
})
export class FormDesignerComponent implements OnInit, OnDestroy {
    sectionList: any[] = [];
    private destroy$ = new Subject<void>();
    sectionEmit() {
        this.formService.addNewSection();
    }

    constructor(public formService: FormRootService) {}

    ngOnInit(): void {
        this.formService.form$.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe((x) => {
            this.sectionList = x.sections;
            console.log('value changed', x);
        });
    }

    swapSection(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.sectionList, event.previousIndex, event.currentIndex);
        this.formService.swapSection(this.sectionList);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
