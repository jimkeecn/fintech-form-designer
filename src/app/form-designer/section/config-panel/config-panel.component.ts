import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import {
    createNewRow,
    DragableItem,
    DragableItemProperty,
    DragTitleEnum,
    FormRow,
    FormSection
} from '../../../models/dragable-list';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SectionConfigDialogComponent } from '../section-config-dialog/section-config-dialog.component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import { FormRootService } from '../../../root-services/form-root-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RowConfigDialogComponent } from '../row-config-dialog/row-config-dialog.component';

/**
 * [Important to read]
 * When configuration changed on the form. you not only need to call rootService.updateSection,
 * you also need to update the formlyFieldsMap in order for the UI to react to the changes
 */
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
    @Input() isFirst!: boolean;

    formlyFieldsMap = new Map<string, FormlyFieldConfig[]>();
    ref: DynamicDialogRef | undefined;

    constructor(
        public dialogService: DialogService,
        private cRef: ChangeDetectorRef,
        private formRootService: FormRootService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        console.log('config panel', this.section);
        if (this.section) {
            this.section.rows.forEach((row) => {
                this.getFormlyFields(row);
            });
        }
    }

    /**
     * Section
     */

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

    deleteSectionSetting(sectionId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this.formRootService.deleteSection(sectionId);
                this.messageService.add({
                    severity: 'info',
                    summary: 'Removed',
                    detail: 'section removed',
                    life: 1000
                });
            },
            reject: () => {}
        });
    }

    /***
     * Row
     *
     * When row dropped at [place new row here]
     * conditional check if there is no row, add a new row
     * if there are rows, check the previous row has fieldGroup or not
     * if no field group, refuse to add new row.
     */
    rowDropped(section: FormSection, id?: string): void {
        section.ffw_isDraggingOver = false;
        const row = createNewRow(section.rows.length);
        if (!this.checkPreviousRow(section.rows)) return;
        section.rows.push(row);
        this.formRootService.updateSection(section);
    }

    rowEnterPredict = (drag: CdkDrag): boolean => {
        const data = drag.data as DragableItem;
        return data.ffw_key === DragTitleEnum.Row;
    };

    moveRowUp(section: FormSection, index: number, isFirst: boolean) {
        if (isFirst) return;
        moveItemInArray(section.rows, index, index - 1);
        this.formRootService.updateSection(section);
    }

    moveRowDown(section: FormSection, index: number, isLast: boolean) {
        if (isLast) return;
        moveItemInArray(section.rows, index, index + 1);
        this.formRootService.updateSection(section);
    }

    private checkPreviousRow(rows: FormRow[]): boolean {
        if (rows.length === 0) return true;
        if (rows[rows.length - 1].fieldGroup.length === 0) return false;
        return true;
    }

    /**
     * This part of logic can be replace with better user experience by create a formly field wrapper to trigger field level setting.
     * [Name to do rename since it's targeting field instead of row]
     */
    openFieldSetting(row: FormRow, key: string, index: number) {
        this.ref = this.dialogService.open(RowConfigDialogComponent, {
            data: { row, index },
            width: '50vw',
            modal: true,
            styleClass: 'ffb-none-header-dialog',
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        });

        this.ref.onClose.subscribe((data: FormRow | undefined) => {
            if (data) {
                console.log(data);
                const index = this.section.rows.findIndex((row) => row.ffw_key === key);
                if (index !== -1) {
                    this.section.rows[index] = data;
                }
                this.formRootService.updateSection(this.section);
                this.getFormlyFields(data);
            }
        });
    }

    deleteField(section: FormSection, rowId: string, index: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                let formMapValue = this.formlyFieldsMap.get(rowId);
                if (formMapValue && formMapValue.length > 0) {
                    console.log(formMapValue);
                    if (formMapValue[0].fieldGroup?.length === 1) {
                        //remove the whole row if last field is removed
                        section.rows.splice(
                            section.rows.findIndex((x) => x.ffw_key === rowId),
                            1
                        );
                        this.formlyFieldsMap.delete(rowId);
                        this.formRootService.updateSection(section);
                        this.formRootService.removeOptionConnectTo(rowId);
                    } else {
                        formMapValue[0].fieldGroup?.splice(index, 1);
                        section.rows[section.rows.findIndex((x) => x.ffw_key === rowId)].fieldGroup.splice(index, 1);
                        this.formRootService.updateSection(section);
                    }
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Removed',
                        detail: 'field removed',
                        life: 1000
                    });
                }
            },
            reject: () => {}
        });
    }

    /**
     * Field
     * Checkbox apply to whole role, if there is a checkbox in the row, cannot add anything else
     * if there is anything else in the row, cannot add checkbox
     */

    fieldEnterPredict(drag: CdkDrag, drop: CdkDropList<FormRow>): boolean {
        const dropList = drop.data;
        const data = drag.data as DragableItem;
        if (data.ffw_key === DragTitleEnum.CHECKBOX) {
            return dropList.fieldGroup.length === 0;
        } else {
            const index = dropList.fieldGroup.findIndex((x) => x.ffw_key === DragTitleEnum.CHECKBOX);
            return data.ffw_key !== DragTitleEnum.Row && data.ffw_key !== DragTitleEnum.Section && index == -1;
        }
    }

    /*** When a new field dropped
     * conditional check if there is matching option
     * if the fieldGroup contains origin + dropped group more than 3, abort
     * each row can only have maximum of 3 fields
     */
    fieldDropped($event: any, section?: FormSection, rowId?: string): void {
        const item = $event.item.data;
        const row = section?.rows.find((x) => x.ffw_key === rowId);
        const options: DragableItemProperty[] = cloneDeep(item.properties);
        if (row?.fieldGroup && row?.fieldGroup?.length + options.length > 3) return;

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
                row.ffw_isDraggingOver = false;
                this.getFormlyFields(row);
            }
            if (section) this.formRootService.updateSection(section);
        }
    }

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
        console.log(this.formlyFieldsMap);
    }

    splitFormlyFields(ffwKey: string) {
        const array = this.formlyFieldsMap.get(ffwKey);
        if (array && array.length > 0) {
            return array[0].fieldGroup;
        }
        return [];
    }
}
