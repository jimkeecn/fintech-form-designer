import { Component, Input } from '@angular/core';
import { DragableCategory } from '../models/dragable-list';

@Component({
    selector: 'ffb-form-options',
    templateUrl: './form-options.component.html',
    styleUrl: './form-options.component.scss'
})
export class FormOptionsComponent {
    @Input() reportOptions!: DragableCategory[];

    forbidToEnter(): boolean {
        return false;
    }
}
