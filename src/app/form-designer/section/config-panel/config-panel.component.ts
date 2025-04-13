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
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';

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
        if (!this.checkPreviousRow(section.rows)) return;
        section.rows.push(row);
        this.updateSection.emit(section);
    }

    private checkPreviousRow(rows: FormRow[]): boolean {
        if (rows.length === 0) return true;
        if (rows[rows.length - 1].fieldGroup.length === 0) return false;
        return true;
    }

    openSectionSetting(section: FormSection) {
        this.ref = this.dialogService.open(SectionConfigDialogComponent, {
            header: 'Section Setting',
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
        const row = section?.rows.find((x) => x.ffw_key === rowId);
        if (row?.fieldGroup && row?.fieldGroup?.length > 2) return;
        console.log('original list', FIELD_OPTION_LIST);
        const options = this.getFieldConfiguration(item.ffw_key);
        if (options && options.length > 0) {
            options.forEach((option) => {
                option.key = uuidv4();
                row?.fieldGroup?.push({
                    ffw_key: item.ffw_key,
                    option
                });
            });
            if (row) {
                row.hasConfig = true;
                this.getFormlyFields(row);
            }
            this.updateSection.emit(section);
        }
    }

    /** per option from left panel can sometime contains multiple fields. */
    private getFieldConfiguration(key: string): FormlyFieldConfig[] {
        const options = FIELD_OPTION_LIST.filter((x) => x.key === key);
        if (!options) return [];
        return cloneDeep(options);
    }

    formlyFieldsMap = new Map<string, FormlyFieldConfig[]>();

    private getFormlyFields(row: FormRow) {
        if (!row.ffw_key) return;
        const formlyRow: FormlyFieldConfig = {
            fieldGroupClassName: row.fieldGroupClassName,
            fieldGroup: row.fieldGroup.map((field, index) => {
                return {
                    ...field.option,
                    key: field.option?.key ?? `field_${row.ffw_key}_${index}`
                };
            })
        };
        this.formlyFieldsMap.set(row.ffw_key, [formlyRow]);
    }
}
