import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myProfile: any;
  profileForm: FormGroup;
  
  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMyProfile();
    this.createForm();
    
  }

  getMyProfileFromRoute(){
    this.route.data.subscribe(data => {
      this.myProfile = data['myProfile'];
      this.setDataToForm(this.myProfile);
    },err => {

    },() => {
    });

    
  }

  setDataToForm(form: any){
    this.profileForm.controls['id'].setValue(form.id);
    this.profileForm.controls['email'].setValue(form.email);
    this.profileForm.controls['displayname'].setValue(form.displayname);
    this.profileForm.controls['phoneNumber'].setValue(form.phoneNumber);
    this.profileForm.controls['oldPassword'].setValue(form.oldPassword);
    this.profileForm.controls['newPassword'].setValue(form.newPassword);
    if(form.address){
      debugger
      this.profileForm.get('address').patchValue(form.address);
    }
  }

  getMyProfile(){
    this.accountService.getMyProfile().subscribe((response: any) => {
      if(response){
        console.log(response);

        this.myProfile = response;
        this.profileForm.controls['id'].setValue(response.id);
        this.profileForm.controls['email'].setValue(response.email);
        this.profileForm.controls['displayname'].setValue(response.displayname);
        this.profileForm.controls['phoneNumber'].setValue(response.phoneNumber);
        this.profileForm.controls['oldPassword'].setValue(response.oldPassword);
        this.profileForm.controls['newPassword'].setValue(response.newPassword);
        if(response.address){
          debugger
          this.profileForm.get('address').patchValue(response.address);
        }
      }
    },
    err => {
      console.log(err);
    });
  }

  createForm() {
    this.profileForm = this.fb.group({
      id: [],
      email: [, [Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$')]],
      displayname: [, [Validators.required]],
      phoneNumber: [, [Validators.required]],
      oldPassword: [],
      newPassword: [],
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

  //Udpdate my profile
  onSubmit(user: any){
    console.log(user);
    
    this.accountService.updateMyProfile(user).subscribe(() => {
      this.toaster.success("Updated successfully");
    },
    err => {
      console.log(err);
    });
  }

  cancel(){
    this.router.navigate(['/shop']);     
  }

}
