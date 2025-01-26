# JobQuest

**JobQuest** is a web application that helps users organize, track, and manage their job applications efficiently. It offers tools to log applications, visualize progress, and keep reminders for follow-ups.

-- check out the deployment [jobquest.tarunteja.dev](https://jobquest.tarunteja.dev)

---

## Features

- **Dashboard**: View application summaries and statuses at a glance.
- **Job Tracking**: Add, edit, and delete job applications with relevant details (job title, company, date, status, notes).
- **Search & Filters**: Search by job title, filter by status or date range. (In Development)
- **Reminders**: Set follow-up and interview reminders. (In Development)
- **Analytics**: Track application trends, response rates, and success ratios. (In Development)
- **Authentication**: Secure login and registration.

---

## Tech Stack

### Backend
- **Spring Boot**: RESTful APIs for job application management.
- **Spring Data JPA**: For database interactions.
- **Spring Security**: Optional user authentication.
- **MySQL**: Primary database (H2 for development).

### Frontend
- **Angular**: Dynamic, component-based UI.
- **Angular Material**: Responsive and modern design.
- **Chart.js**: For visualizing job trends.

---

## Installation

### Prerequisites
- Java 17+, Maven
- Node.js, Angular CLI
- MySQL Database

### Steps to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/iam-tarun/JobQuest.git
   cd JobQuest
   ```
2. **Generate the Secret Key**
   generate the secret in backed using secretKeyGenerator file.

3. **Backend Setup**:
   ```bash
   cd job-quest-backend
   # Update `application.properties` with your MySQL credentials and jwt secret token.
   mvn spring-boot:run
   ```

4. **Frontend Setup**:
   ```bash
   cd ../job-quest-client
   npm install
   ng serve
   ```

5. **Access the App**: Open `http://localhost:4200`.

---

## API Endpoints

### Job Application APIs
- `GET /api/application`: Fetch all applications.
- `POST /api/application`: Add a new application.
- `PUT /api/applications/{id}`: Update an application. (In Development)
- `DELETE /api/applications/{id}`: Delete an application. (In Development)

### Authentication (Optional)
- `POST /api/register`: User registration.
- `POST /api/login`: User login.

---

## Future Enhancements
- Export application data to CSV/Excel.
- Integrate with job portals like LinkedIn.
- Improve mobile responsiveness.
- Collaborate and share application status with peers.

---

## Contributing
1. Fork the repo and create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
2. Commit changes and push:
   ```bash
   git commit -m "Add feature"
   git push origin feature-branch
   ```
3. Submit a pull request.

---

## License
This project is licensed under the **MIT License**.

---

## Contact
For suggestions or issues, reach out via [GitHub Issues](https://github.com/iam-tarun/JobQuest/issues).

--- 

Let me know if you need further tweaks! 🚀
