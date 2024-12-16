import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-applications',
  imports: [NgFor],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {

  constructor(private applicationService: ApplicationService) {}

  applications: Array<Application> = [];

  ngOnInit(): void {
      this.applicationService.getApplications().subscribe({
        next: (response) => {
          this.applications = response;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }
}
