# CodeAlpha Event Registration System

A backend-focused Event Registration System developed as part of the **CodeAlpha Backend Development Internship**.

The system provides RESTful APIs for managing events, user registrations, authentication, and role-based access control.

## 🚀 Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Postman
* Git & GitHub

## ✨ Features

### Authentication

* User registration
* Secure password hashing using bcrypt
* User login
* JWT-based authentication
* Protected API routes

### Event Management

* View all events
* View event details
* Create events
* Update events
* Delete events
* Event capacity management

### Registration Management

* Register for an event
* Prevent duplicate registrations
* View logged-in user's registrations
* Cancel own registration
* Prevent registration when an event is fully booked
* User-event relationship using MongoDB ObjectId references

### Role-Based Access Control

* User and Admin roles
* Admin-only event management
* Admin-only access to all registrations
* Protected registration and cancellation endpoints

## 📁 Project Structure

```text
CodeAlpha_EventRegistration
│
├── src
│   ├── controllers
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── registrationController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── models
│   │   ├── eventModel.js
│   │   ├── registrationModel.js
│   │   └── userModel.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   │
│   └── server.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🔐 Authentication

The API uses **JWT (JSON Web Token)** authentication.

Users receive a JWT after successful login. The token is required for protected endpoints.

Example:

```text
Authorization: Bearer YOUR_TOKEN
```

Passwords are securely hashed using **bcryptjs** before being stored in the database.

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Events

| Method | Endpoint          | Access |
| ------ | ----------------- | ------ |
| GET    | `/api/events`     | Public |
| GET    | `/api/events/:id` | Public |
| POST   | `/api/events`     | Admin  |
| PUT    | `/api/events/:id` | Admin  |
| DELETE | `/api/events/:id` | Admin  |

### Registrations

| Method | Endpoint                        | Access             |
| ------ | ------------------------------- | ------------------ |
| POST   | `/api/events/:eventId/register` | Authenticated User |
| GET    | `/api/my-registrations`         | Authenticated User |
| GET    | `/api/registrations`            | Admin              |
| DELETE | `/api/registrations/:id`        | Registration Owner |

## 🧪 API Testing

The API was tested using **Postman**, including:

* User registration
* User login
* JWT authentication
* Event creation
* Event update
* Event deletion
* Event listing
* Event details
* Event registration
* Duplicate registration prevention
* Event capacity validation
* Viewing personal registrations
* Registration cancellation
* Ownership validation
* Admin authorization
* Invalid ID handling

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/iqrak5143-sketch/CodeAlpha_EventRegistration.git
```

### 2. Navigate to the project

```bash
cd CodeAlpha_EventRegistration
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/event_registration
JWT_SECRET=your_secret_key
```

### 5. Start the server

```bash
node src/server.js
```

The API will run at:

```text
http://localhost:3000
```

## 🎯 Internship Task

This project was developed as **Task 2: Event Registration System** for the CodeAlpha Backend Development Internship.

The project demonstrates practical backend concepts including:

* REST API development
* MVC-style project structure
* MongoDB database relationships
* Authentication
* Authorization
* JWT
* Password hashing
* Middleware
* CRUD operations
* API validation
* Error handling

## 👩‍💻 Developer

**Iqra Khan**

BS Information Technology Studen
<br>
Backend Development Intern — CodeAlpha
