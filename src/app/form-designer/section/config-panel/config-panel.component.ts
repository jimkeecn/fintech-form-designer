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
import {
    createNewRow,
    DragableItem,
    DragTitleEnum,
    FIELD_OPTION_LIST,
    FormField,
    FormRow,
    FormSection
} from '../../../models/dragable-list';
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
        return data.ffw_key === DragTitleEnum.Row;
    };

    /*** When row dropped at [place new row here]
     * conditional check if there is no row, add a new row
     * if there are rows, check the previous row has fieldGroup or not
     * if no field group, refuse to add new row.
     */
    rowDropped(section: FormSection, id?: string): void {
        section.ffw_isDraggingOver = false;
        const row = createNewRow(section.rows.length);
        if (!this.checkPreviousRow(section.rows[section.rows.length]) && section.rows.length > 0) return;
        section.rows.push(row);
        this.updateSection.emit(section);
    }

    private checkPreviousRow(row: FormRow) {
        if (row && row.fieldGroup && row.fieldGroup?.length > 0) return true;
        return false;
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

    fieldEnterPredict = (drag: CdkDrag): boolean => {
        const data = drag.data as DragableItem;
        return data.ffw_key !== DragTitleEnum.Row && data.ffw_key !== DragTitleEnum.Section;
    };

    /*** When a new field dropped
     * conditional check if there is matching option
     * if the group contains less than 3
     */
    fieldDropped($event: any, section?: FormSection, rowId?: string): void {
        const item = $event.item.data;
        console.log('field dropped', item, section, rowId);
        const option = this.getFieldConfiguration(item.ffw_key);
        if (!option) return;
        const row = section?.rows.find((x) => x.ffw_key === rowId);
        if (row?.fieldGroup && row?.fieldGroup?.length > 2) return;
        row?.fieldGroup?.push(option);
        if (row && row.hasConfig) row.hasConfig = true;
        this.updateSection.emit(section);
    }

    private getFieldConfiguration(key: string): FormField | null {
        const option = FIELD_OPTION_LIST.find((x) => x.ffw_key === key);
        if (!option) return null;
        return option;
    }
}
