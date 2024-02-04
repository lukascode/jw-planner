import { AbstractControl, FormControl } from '@angular/forms';
import {Gender, MemberSnapshot} from '../../dashboard/members/members.model';

export class Utils {
    static markAllTouched(control: AbstractControl): void {
        if (control.hasOwnProperty('controls')) {
            control.markAsTouched();
            const ctrl = <any>control;
            for (const inner in ctrl.controls) {
                this.markAllTouched(ctrl.controls[inner] as AbstractControl);
            }
        } else {
            (<FormControl>control).markAsTouched();
        }
    }

  static getMembers(members: MemberSnapshot[], roles: string[]): MemberSnapshot[] {
    let result: MemberSnapshot[] = members ? members : [];
    if (roles && roles.length > 0) {
      result = result
        .filter(m => m.responsibilities
          .map(r => r.split(':')[0])
          .some(r => roles.includes(r)));
    }
    function sortByLastName(m1: MemberSnapshot, m2: MemberSnapshot): number {
      const lastName1 = m1.lastName.toUpperCase();
      const lastName2 = m2.lastName.toUpperCase();
      if (lastName1 < lastName2) {
        return -1;
      }
      if (lastName1 > lastName2) {
        return 1;
      }
      return 0;
    }
    const males = result.filter(m => Gender.MALE === m.gender).sort(sortByLastName);
    const females = result.filter(m => Gender.FEMALE === m.gender).sort(sortByLastName);
    return [...males, ...females];
  }
}
