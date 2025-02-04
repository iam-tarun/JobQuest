import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
  imports: [NgFor, NgIf, FormsModule, MatIconModule]
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  paginatedApplications: Application[] = [];
  isEditing: boolean[] = [];

  pageSize: number = 15; 
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications() {
    this.applicationService.getApplications().subscribe({
      next: (response) => {
        this.applications = response;
        this.totalPages = Math.ceil(this.applications.length / this.pageSize);
        this.updatePaginatedData();
        this.isEditing = this.applications.map(() => false);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedApplications = this.applications.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  enableEditing(idx: number) {
    this.isEditing[idx] = true;
  }

  saveChanges(idx: number) {
    this.isEditing[idx] = false;
    this.applicationService.updateApplication(this.paginatedApplications[idx]).subscribe({
      next: (res) => {
        this.paginatedApplications[idx] = res;
        const actualIndex = (this.currentPage - 1) * this.pageSize + idx;
        this.applications[actualIndex] = res;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe({
      next: () => {
        this.applications = this.applications.filter(app => app.id !== id);
        this.totalPages = Math.ceil(this.applications.length / this.pageSize);
        this.updatePaginatedData();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openResume(id: number) {
    this.applicationService.openResume(id).subscribe({
      next: (blob: Blob) => {
        const link = URL.createObjectURL(blob);
        const tab = window.open(link, '_blank');
        if (tab) {
          tab.document.title = 'Resume';
        }
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
}
