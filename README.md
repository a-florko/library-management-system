# Library Management System
## Overview
The **Library Management System** is a full-stack web application designed to streamline the management of books within a library. It offers core functionalities like viewing, adding, updating, and deleting books. This project is built using **React** for the frontend and **.NET Web API** with **Entity Framework Core** and **MySQL** for the backend.

## Features
- **View Books:** Display a list of all books in the library.
- **Book Details:** View detailed information about each book.
- **Add Book:** Add new books to the library.
- **Update Book:** Edit information of existing books.
- **Delete Book:** Remove books from the library.
- **Overdue Book Tracking:** View books that are overdue for return..
  
## Technologies Used
### Frontend
- **React**
- **TypeScript**
- **Axios**
- **React Router**
- **Bootstrap**

### Backend
- **.NET Web API**
- **Entity Framework Core**
- **MySQL**

## Getting Started
### Prerequisites
- **Node.js:** Ensure you have Node.js installed for running the frontend.
- **.NET SDK:** Required for running the backend API.
- **MySQL:** Database server to store and manage library data.

### Setup
**1. Clone the Repository**
```
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

**2. Install Frontend Dependencies**
```
cd frontend
npm install
```

**3. Install Backend Dependencies**
```
cd ../backend
dotnet restore
```

**4. Configure Database**

Update the connection string in `appsettings.json` to point to your MySQL database.

**5. Run the Application**

**Backend:** Start the .NET Web API
```
cd backend
dotnet run
```
**Frontend:** Start the React application
```
cd frontend
npm start
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue to improve the project.

## License
This project is licensed under the MIT License.
