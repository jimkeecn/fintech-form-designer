import { Injectable } from '@angular/core';
import { FormRootService } from './form-root-service.service';

@Injectable({
    providedIn: 'root'
})
export class FormExportService {
    constructor(private frService: FormRootService) {}

    downloadJsonFile() {
        this.frService.form$.subscribe((data) => {
            const jsonStr = JSON.stringify(data, null, 2); // Pretty-print with 2-space indent
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'formJson';
            a.click();

            URL.revokeObjectURL(url); // Clean up
        });
    }
}
