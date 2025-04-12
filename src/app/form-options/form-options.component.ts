import { Component, Input } from '@angular/core';
import { DragableCategory } from '../models/dragable-list';
import { FormRootService } from '../root-services/form-root-service.service';

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

    constructor(public formService: FormRootService) {}
}
