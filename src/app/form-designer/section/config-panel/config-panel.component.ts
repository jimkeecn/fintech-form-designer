import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { createNewRow, DragableItem, DragTitleEnum, FormSection } from '../../../models/dragable-list';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SectionConfigDialogComponent } from '../section-config-dialog/section-config-dialog.component';

@Component({
    selector: 'ffb-config-panel',
    templateUrl: './config-panel.component.html',
    styleUrl: './config-panel.component.scss',
    providers: [DialogService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigPanelComponent implements OnInit {
    @Input() section!: FormSection;
    @Input() sectionList: any[] = [];
    @Output() updateSection = new EventEmitter();
    ref: DynamicDialogRef | undefined;
    constructor(public dialogService: DialogService, private cRef: ChangeDetectorRef) {}

    ngOnInit(): void {}

    rowEnterPredict = (drag: CdkDrag): boolean => {
        const data = drag.data as DragableItem;
        return data.key === DragTitleEnum.Row;
    };

    rowDropped(section: FormSection, id?: string): void {
        section.ffw_isDraggingOver = false;
        const row = createNewRow(section.rows.length);
        section.rows.push(row);
        this.updateSection.emit(section);
    }

    openSetting(section: FormSection) {
        this.ref = this.dialogService.open(SectionConfigDialogComponent, {
            header: 'Select a Product',
            data: section,
            width: '50vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });

        this.ref.onClose.subscribe((data) => {
            if (data) {
                console.log(data);
                section.description = data.description;
                section.title = data.title;
                this.cRef.markForCheck();
            }
        });
    }
}
