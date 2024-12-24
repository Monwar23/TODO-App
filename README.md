# TODO App

## Live Link- https://todo-app-codemen.netlify.app/

## Description
The TODO App is a simple yet powerful frontend application built to manage employee profiles and their associated tasks. The app leverages browser local storage for data persistence and includes functionalities like CRUD operations, search, and filtering.

---

## Features

### 1. Employee Management
- **Create Employee Profile**: Add employees with details such as:
  - Name
  - Employee ID
  - Designation
  - Email Address
  - Phone Number
- **View Employee List**: Display a searchable list of employees.
- **Preview Employee Profile**: View detailed information about an employee.
- **Update Employee Profile**: Edit existing employee details.
- **Delete Employee Profile**: Remove an employee from the system.

### 2. Task Assignment
- **Assign Task**:
  - Select an available employee from a dropdown list.
  - Add tasks under the selected employee.
- **Task Reassignment**: Reassign a task to another employee.

### 3. Task Management
- **Task List**: View all tasks associated with employees.
- **Update Task**: Edit the task description, status, or assigned employee.
- **Delete Task**: Remove tasks from the list.
- **Search and Filter**:
  - Search tasks by keywords.
  - Filter tasks by completion status (`Complete` or `Incomplete`).

### 4. Notifications
- **Toast Notifications**:
  - Display success, error, or informational messages for actions like creating, updating, or deleting employees and tasks.

### 5. Data Persistence
- All data (employees and tasks) is stored in the browser's **local storage** for persistent use across sessions.

---

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Libraries**:
  - React Router for navigation
  - React Toastify for toast notifications
  - React Icons

---

## Installation

### Prerequisites
- A modern web browser to run the application.
- Node.js (only for running the development server).
- npm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Monwar23/TODO-App

2. Navigate to the project directory:
   ```bash
   cd TODO-App

3. Install the dependencies:
   ```bash
   npm install

4. Running the App
     ```bash
   npm run dev  
