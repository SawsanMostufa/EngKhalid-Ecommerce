import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];

  constructor(private accountService: AccountService,
    private router: Router,private toasterService: ToastrService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      displayName:[null, Validators.required],
      email:[null,[Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],[this.validateEmailNotTaken()]],
      password: [null,[Validators.required]],
      phoneNumber: [null,[Validators.required]],
      address: this.fb.group({
        firstName: [null,Validators.required],
        lastName: [null,Validators.required],
        street: [null,Validators.required],
        city: [null,Validators.required],
        state: [null,Validators.required],
        zipCode: [null,Validators.required]
      })
    });
  }


  onSubmit(){
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('/');
    }, err => {
      console.error(err);
      this.errors = err.errors;
    });
  }

    
  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExsist(control.value).pipe(
           map(res => {
             return res ? {emailExsist: true} : null;
           })
        );
      })
   );
 }



  }


}
