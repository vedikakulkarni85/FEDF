# Medical Inventory Management System

## Project Overview

The Medical Inventory Management System is a React-based web application developed to simplify the management of medicines in a pharmacy or medical store environment. The system helps users manage medicine records, monitor stock availability, track expiry dates, maintain dispensing history, and perform administrative operations through an easy-to-use dashboard.

This project was developed as part of the Front End Development Frameworks and UI Engineering course.

---

## Objectives

* Manage medicine inventory efficiently.
* Monitor medicine stock levels.
* Track expiry dates of medicines.
* Maintain dispensing records.
* Provide a simple and responsive user interface.
* Demonstrate React component-based architecture and state management.

---

## Technologies Used

### Frontend

* React JS
* JavaScript (ES6+)
* HTML5
* CSS3

### Development Tools

* Node.js
* npm
* Visual Studio Code

### Data Storage

* Browser Local Storage

---

## Features

### User Authentication

* Login functionality
* Input validation
* Error handling

### Dashboard

* Overview of inventory information
* Navigation to different modules
* User-friendly interface

### Medicine Management

* Add medicines
* Update medicine information
* Delete medicine records
* View medicine details

### Dispensing Module

* Dispense medicines
* Track issued medicines
* Update inventory automatically

### History Tracking

* Maintain records of previous transactions
* View dispensing history

### Expiry Monitoring

* Identify medicines nearing expiry
* Improve inventory planning

### Local Storage Integration

* Persistent data storage
* Data remains available after page refresh

---

## React Concepts Used

### Components

The application is divided into reusable components such as:

* Login Page
* Navbar
* Sidebar
* Dashboard
* Medicine Management Pages

### State Management

React Hooks (useState) are used to manage application data and user interactions.

### Props

Props are used to transfer data between parent and child components.

### Form Handling

Controlled components are used for user inputs and validation.

### Component Composition

The application follows a modular structure to improve maintainability and scalability.

---

## Project Structure

src/
│
├── components/
│   ├── LoginPage.jsx
│   ├── Navbar.jsx
│   └── Sidebar.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── AdminPage.jsx
│   ├── MedicinePage.jsx
│   ├── DispensePage.jsx
│   ├── HistoryPage.jsx
│   └── ExpiryPage.jsx
│
├── utils/
│   └── storage.js
│
├── App.js
├── App.css
├── index.js
└── index.css

---

## Installation

### Clone Repository

git clone <repository-url>

### Install Dependencies

npm install

### Run Application

npm run dev

The application will run on:

http://localhost:3000

---

## Learning Outcomes

Through this project, the following concepts were implemented and understood:

* React Components
* Props and State
* React Hooks
* Form Validation
* Local Storage
* Component-Based Architecture
* Dashboard Design
* Inventory Management Systems
* Front-End Project Organization

---

## Future Enhancements

* Backend Integration
* Database Connectivity
* Role-Based Authentication
* API Integration
* React Router Navigation
* Context API State Management
* Cloud Deployment

---

## Conclusion

The Medical Inventory Management System demonstrates the practical application of React fundamentals, including component-driven development, state management, form handling, and reusable UI design. The project provides a foundation for building larger and more scalable healthcare inventory management solutions.
