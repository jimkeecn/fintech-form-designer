import { Component, OnInit } from '@angular/core';
import { FormRootService } from '../root-services/form-root-service.service';

@Component({
    selector: 'ffb-form-designer',
    templateUrl: './form-designer.component.html',
    styleUrl: './form-designer.component.scss'
})
export class FormDesignerComponent implements OnInit {
    sectionEmit() {
        this.formService.addNewSection();
    }

    constructor(public formService: FormRootService) {}

    ngOnInit(): void {
        this.formService.form$.subscribe((x) => {
            console.log(x);
        });
    }
}
