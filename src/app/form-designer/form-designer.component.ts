import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormRootService } from '../root-services/form-root-service.service';
import { DragableItem, DragTitleEnum, FormSection } from '../models/dragable-list';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { FormExportService } from '../root-services/form-export.service';

@Component({
    selector: 'ffb-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrl: './form-designer.component.scss'
})
export class FormDesignerComponent implements OnInit, OnDestroy {
    sectionList: any[] = [];
    designer_menu!: MenuItem[];

    private _menu_on_preview: MenuItem[] = [
        {
            label: 'Go Back',
            icon: PrimeIcons.ARROW_LEFT,
            command: () => {
                this.formService.isPreview$.next(false);
            }
        }
    ];

    private _menu_not_on_preview: MenuItem[] = [
        {
            label: 'Save',
            icon: PrimeIcons.SAVE
        },
        {
            label: 'Preview',
            icon: PrimeIcons.EYE,
            command: () => {
                this.formService.isPreview$.next(true);
            }
        },
        {
            label: 'Publish',
            icon: PrimeIcons.UPLOAD
        },
        {
            label: 'Sync',
            icon: PrimeIcons.CLOUD,
            items: [
                {
                    label: 'Export',
                    icon: PrimeIcons.CLOUD_DOWNLOAD,
                    command: () => {
                        //this.exportService.downloadJsonFile();
                    }
                },
                {
                    label: 'Import',
                    icon: PrimeIcons.CLOUD_UPLOAD
                }
            ]
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

    constructor(public formService: FormRootService, public exportService: FormExportService) {
        this.designer_menu = this._menu_not_on_preview;
    }

    ngOnInit(): void {
        this.formService.form$.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe((x) => {
            this.sectionList = x.sections;
        });

        this.formService.isPreview$.subscribe((x) => {
            if (x) {
                this.designer_menu = this._menu_on_preview;
            } else {
                this.designer_menu = this._menu_not_on_preview;
            }
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
