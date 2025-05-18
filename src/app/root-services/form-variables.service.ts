import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormVariablesService {
    private _variables$ = new BehaviorSubject<any>(null);
    get variables$(): Observable<any> {
        return this._variables$.asObservable();
    }
    setVariables(value: any) {
        this._variables$.next(value);
        this.setVariablesSchema(value);
    }

    private _variablesSchema$ = new BehaviorSubject<any>([]);
    get variablesSchema$(): Observable<any> {
        return this._variablesSchema$.asObservable();
    }

    private setVariablesSchema(variables: any) {
        if (!variables) return;

        const schemaList = [];

        for (let key in variables) {
            const arr = variables[key];

            if (!Array.isArray(arr) || arr.length === 0) continue;

            const sample = arr[0]; // assume all items have same structure
            const properties: Record<string, any> = {};

            for (let prop in sample) {
                const value = sample[prop];
                properties[prop] = { type: this.inferType(value) };
            }

            schemaList.push({
                name: key,
                type: 'array',
                items: {
                    type: 'object',
                    properties
                }
            });
        }
        console.log(schemaList);
        this._variablesSchema$.next(schemaList);
    }

    // Helper to infer basic types
    private inferType(value: any): string {
        const type = typeof value;
        switch (type) {
            case 'string':
                return 'string';
            case 'number':
                return 'number';
            case 'boolean':
                return 'boolean';
            default:
                return 'string'; // default fallback
        }
    }
    constructor() {}

    retrieveVariableValue(propertyName: string): any[] {
        if (!this._variables$.value || typeof this._variables$.value !== 'object') return [];
        return this._variables$.value.hasOwnProperty(propertyName) ? this._variables$.value[propertyName] : [];
    }
}
