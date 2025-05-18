import { Component, OnInit } from '@angular/core';
import { DRAGABLE_LIST, DragableItem, FormConfig } from './models/dragable-list';
import { HttpClient } from '@angular/common/http';
import { FormVariablesService } from './root-services/form-variables.service';

//https://github.com/ngx-formly/ngx-formly/blob/main/src/core/src/lib/models/fieldconfig.ts

@Component({
    selector: 'ffb-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    title = 'fintech-form-buidler';
    form!: FormConfig;
    readonly DRAGABLE_LIST = DRAGABLE_LIST;

    constructor(private http: HttpClient, private varService: FormVariablesService) {}

    ngOnInit(): void {
        this.http.get('/assets/json/json.json').subscribe((x) => {
            this.varService.setVariables(x);
        });
    }
}
