import { Component, Input } from '@angular/core';
import { DragableCategory } from '../models/dragable-list';

@Component({
    selector: 'ffb-report-options',
    templateUrl: './report-options.component.html',
    styleUrl: './report-options.component.scss'
})
export class ReportOptionsComponent {
    @Input() reportOptions!: DragableCategory[];

    forbidToEnter(): boolean {
        return false;
    }
}
