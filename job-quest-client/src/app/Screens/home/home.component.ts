import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  totalApplications = 50;
  rejectedApplications = 10;
  inProcessApplications = 25;
  interviewApplications = 15;
}
