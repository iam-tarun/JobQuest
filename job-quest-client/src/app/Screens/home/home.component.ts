import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalApplications = 0;
  rejectedApplications = 0;
  inProcessApplications = 0;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {  
      this.applicationService.getApplicationStats().subscribe({
        next: (response) => {
          this.totalApplications = response.total;
          this.rejectedApplications = response.rejected;
          this.inProcessApplications = this.totalApplications - this.rejectedApplications;
        }
      })
  }
}
