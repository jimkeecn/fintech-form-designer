import { Component } from '@angular/core';

@Component({
    selector: 'ffb-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrl: './form-designer.component.scss'
})
export class FormDesignerComponent {
    sectionEmit($event: any) {
        console.log($event);
    }
}
