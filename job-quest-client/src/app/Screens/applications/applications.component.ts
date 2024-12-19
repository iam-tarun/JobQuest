import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-applications',
  imports: [NgFor, MatIconModule, NgIf, FormsModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {

  constructor(private applicationService: ApplicationService) {}

  applications: Array<Application> = [];
  isEditing: boolean[] = [];
  ngOnInit(): void {
      this.applicationService.getApplications().subscribe({
        next: (response) => {
          this.applications = response;
          this.isEditing = this.applications.map(() => false);
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  enableEditing(idx: number) {
    this.isEditing[idx] = true;
  }

  saveChanges(idx: number) {
    this.isEditing[idx] = false;
    console.log(idx);
  }


  searchText = '';

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe({
      next: (res) => {
        this.applicationService.getApplications().subscribe({
          next: (response) => {
            this.applications = response;
          },
          error: (e) => {
            console.log(e);
          }
        })
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
