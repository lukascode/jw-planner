import { AbstractControl, FormControl } from '@angular/forms';

export class Utils {
    static markAllTouched(control: AbstractControl) {
        if (control.hasOwnProperty('controls')) {
            control.markAsTouched();
            const ctrl = <any>control;
            for (let inner in ctrl.controls) {
                this.markAllTouched(ctrl.controls[inner] as AbstractControl);
            }
        } else {
            (<FormControl>control).markAsTouched();
        }
    }
}