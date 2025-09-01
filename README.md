# Student Exam Portal

A web-based platform for conducting online exams with secure authentication, timer-based questions, and result evaluation.

## Features

- **Secure Login**: User authentication with email and password.
- **Exam Interface**: Interactive multiple-choice questions with navigation.
- **Timer**: Real-time countdown to ensure exam completion within the allotted time.
- **Result Evaluation**: Instant scoring upon submission.

## Screenshots

### Login Page
![Login Page](./images/login.png.png)

### Exam Interface
![Exam Interface](./images/exam-interface.png.png)

> **Note:** Place your images in an `images` folder at the root of the project for proper display.  
> To add screenshots:
> 1. Create a folder named `images` in your repository.
> 2. Upload your screenshots into this folder (e.g., `login.png`, `exam-interface.png`).
> 3. Commit the changes:
>    ```bash
>    git add images/
>    git commit -m "Added screenshots for README"
>    git push origin main
>    ```

## Technologies Used

- Frontend: HTML, CSS, JavaScript (React/Vanilla)
- Backend: Node.js / Java (Spring Boot)
- Database: MySQL / MongoDB
- Authentication: JWT / Session-based

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/student-exam-portal.git
   ```
2. Install dependencies:
   ```bash
   npm install   # For Node.js
   mvn install   # For Java (if using Spring Boot)
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open in browser:
   ```
   http://localhost:3000
   ```

## Usage

1. Login using valid credentials.
2. Start the exam and navigate between questions.
3. Submit before the timer ends.
4. View your results instantly.

## Future Enhancements

- Question randomization
- Admin panel for exam creation
- Enhanced result analytics

## AI Assistance Acknowledgement

I used **ChatGPT** to:
- Draft the initial README structure.
- Suggest commit message best practices.
- Provide guidance on adding screenshots and organizing repository content.

All code implementation, customization, and testing were done by me.

## License

This project is licensed under the MIT License.
