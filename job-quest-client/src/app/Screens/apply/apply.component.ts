import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply',
  imports: [ReactiveFormsModule],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.css'
})
export class ApplyComponent {

  applicationForm = new FormGroup({
    roleName : new FormControl('', Validators.required),
    companyName : new FormControl('', Validators.required),
    dateOfApplication : new FormControl('', Validators.required),
    platform : new FormControl('', Validators.required),
    status : new FormControl(''),
    resume : new FormControl('', Validators.required),
    jobDescription : new FormControl('', Validators.required),
    remarks : new FormControl(''),
    tag : new FormControl(''),
  })


  onSubmit() {
    console.log(this.applicationForm.value)
  }

}
