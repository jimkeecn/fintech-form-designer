import { Component } from '@angular/core';
import { DRAGABLE_LIST, DragableItem } from './models/dragable-list';

//https://github.com/ngx-formly/ngx-formly/blob/main/src/core/src/lib/models/fieldconfig.ts

@Component({
    selector: 'ffb-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'fintech-form-buidler';
    isDraggingOver: boolean = false;
    readonly DRAGABLE_LIST = DRAGABLE_LIST;

    droppedItems: DragableItem[] = [];

    drop($event: any): void {
        console.log('drop');
    }

    drop2($event: any): void {
        console.log('drop2');
    }

    test(): void {
        console.log('test');
    }
}
