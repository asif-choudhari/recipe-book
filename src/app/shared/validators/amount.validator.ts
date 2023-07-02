import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export class AmountValidators {
  static asyncNegativeNumberValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      if (control.value <= 0) {
        resolve({negativeNumber: true})
      } else{
         resolve(null)
      }
    })

    return promise;
  }

  static negativeNumberValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value <= 0) {
      return {negativeNumber: true};
    } else{
       return null;
    }
  }

}
