import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormRootService } from '../root-services/form-root-service.service';
import { DragableItem, DragTitleEnum, FormSection } from '../models/dragable-list';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
    selector: 'ffb-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrl: './form-designer.component.scss'
})
export class FormDesignerComponent implements OnInit, OnDestroy {
    sectionList: any[] = [];
    designer_menu: MenuItem[] = [
        {
            label: 'Save',
            icon: PrimeIcons.SAVE
        },
        {
            label: 'Preview',
            icon: PrimeIcons.EYE,
            command: () => {
                this.formService.isPreview$.next(!this.formService.isPreview$.value);
            }
        },
        {
            label: 'Publish',
            icon: PrimeIcons.UPLOAD
        },
        {
            label: 'Export',
            icon: PrimeIcons.FILE_EXPORT
        },
        {
            label: 'Import',
            icon: PrimeIcons.FILE_IMPORT
        },
        {
            label: 'Delete',
            icon: PrimeIcons.TRASH,
            styleClass: 'color-override-menubar-danger'
        }
    ];
    private destroy$ = new Subject<void>();
    sectionEmit() {
        this.formService.addNewSection();
    }

    constructor(public formService: FormRootService) {}

    ngOnInit(): void {
        this.formService.form$.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe((x) => {
            this.sectionList = x.sections;
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
