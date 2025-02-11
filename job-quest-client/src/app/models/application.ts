import { ApplicationStatus } from "../enums/application-status";

export class Application {
  id: number;
  roleName: string;
  companyName: string;
  tag: string;
  remarks: string;
  jobDescription: string;
  platform: string;
  status: ApplicationStatus;
  dateOfApplication: Date;
  resume: string;
  createdAt: Date;
  updatedAt: Date;


  constructor(
    roleName: string,
    companyName: string,
    tag: string,
    remarks: string,
    jobDescription: string,
    platform: string,
    status: ApplicationStatus,
    dateOfApplication: Date,
    resume: string,
    createdAt: Date,
    updatedAt: Date,
    id: number
  ) {
    this.roleName = roleName;
    this.companyName = companyName;
    this.tag = tag;
    this.remarks = remarks;
    this.jobDescription = jobDescription;
    this.platform = platform;
    this.status = status;
    this.dateOfApplication = dateOfApplication;
    this.resume = resume;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }

}
