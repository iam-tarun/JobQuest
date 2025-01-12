import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-apply',
  imports: [ReactiveFormsModule],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.css'
})
export class ApplyComponent {

  constructor (private applicationsService: ApplicationService) {}

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.applicationForm.get('resume')?.setValue(file as any);
  }


  onSubmit() {
    if(this.applicationForm.valid) {
      const formValue = this.applicationForm.value;

      // console.log('Form Submitted:', formValue);

    // Access the file
      const file = formValue.resume; // Attach the file to FormData

      const formData = new FormData();
      formData.append('resume', file as any); 

      // Append other form fields
      Object.keys(this.applicationForm.controls).forEach((key) => {
        if (key !== 'resume') {
          formData.append(key, this.applicationForm.get(key)?.value || '');
        }
      });
      this.applicationsService.submitApplication(formData).subscribe({
        next: (response) => {
          this.applicationForm.reset();
        },
        error: (err) => {
          // console.log(err);
        }
      })
    }
    else {
      // console.log('Form is invalid');
    }
  }

}
