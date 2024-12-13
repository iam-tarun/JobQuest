# JobQuest

JobQuest is a web application designed to help users organize and track their job applications efficiently. It provides features like adding job details, filtering applications, setting reminders, and visualizing application status through a dashboard.

---

## Features

- **Dashboard**:
  - View a summary of total applications, status breakdown, and recent applications.
- **Job Application Management**:
  - Add, edit, and delete job applications with details like job title, company name, date applied, status, and notes.
- **Filters and Search**:
  - Filter applications by status, company, or date range.
  - Search applications by job title or keywords.
- **Notifications**:
  - Set reminders for follow-ups and interviews (optional).
- **Analytics (Optional)**:
  - Visualize metrics like application trends, response rates, and offer ratios.
- **User Authentication**:
  - Secure login and registration for users.

---

## Tech Stack

### Backend

- **Spring Boot**
  - RESTful APIs for managing job applications and user data.
  - Spring Data JPA for database interactions.
  - Authentication and authorization using Spring Security (optional).
- **Database**
  - MySQL (or H2 for development).

### Frontend

- **Angular**
  - Dynamic and interactive user interface.
  - Angular Material or Bootstrap for responsive design.
- **Charts**
  - ng2-charts or Chart.js for data visualization.

---

## Installation

### Prerequisites

- **Backend**: Java 17+, Maven, MySQL (or H2 for development).
- **Frontend**: Node.js, Angular CLI.

### Steps to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/jobquest.git
   cd jobquest
   ```

2. **Backend Setup**:

   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Update `application.properties` with your database credentials.
   - Build and run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```

3. **Frontend Setup**:

   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the Angular application:
     ```bash
     ng serve
     ```

4. **Access the Application**:

   - Open your browser and navigate to `http://localhost:4200`.

---

## API Endpoints

### Job Application Endpoints

- `GET /api/applications`: Retrieve all job applications.
- `POST /api/applications`: Add a new job application.
- `PUT /api/applications/{id}`: Update an existing application.
- `DELETE /api/applications/{id}`: Delete an application.

### User Authentication Endpoints (Optional)

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate a user and retrieve a token.

---

## Future Enhancements

- **Data Export**:
  - Allow users to export their job application data to a CSV or Excel file.
- **Integration with Job Portals**:
  - Automatically fetch job details from LinkedIn or other job portals.
- **Mobile-Friendly Design**:
  - Ensure a seamless experience on mobile devices.
- **Collaboration**:
  - Share application status with mentors or friends.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any questions or suggestions, feel free to contact:

- **Email**: [tarunteja2810@gmail.com](mailto\:tarunteja2810@gmail.com)
- **GitHub**: [iam-tarun](https://github.com/iam-tarun)
